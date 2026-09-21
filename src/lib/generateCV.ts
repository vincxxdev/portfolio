import jsPDF from 'jspdf';
import { siteConfig } from '@/config/site';
import { skillsData } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { registerRobotoFont } from '@/lib/fonts/roboto';
import { TIER_RANK, GROUP_RANK, type SkillTier } from '@/types';
import type { Locale } from '@/i18n/types';
import { it } from '@/i18n/locales/it';
import { en } from '@/i18n/locales/en';

/**
 * The standard CV: one column, dates in a left-hand gutter.
 *
 * This replaced a two-column layout with a navy sidebar, a cyan accent, skill
 * dot-ratings and pill-shaped technology tags. The rating dots were the worst
 * of it — a self-assessed 4-of-5 on a CV asserts a precision nobody can check,
 * and reads as decoration. Proficiency is stated in words instead, grouped by
 * the same tiers the site uses.
 *
 * It is the CV everyone actually gets: DownloadCVButton hands the simplified
 * variant only to an authenticated admin, and every other visitor this one.
 *
 * The page is near-monochrome on purpose. Print has no dark mode and no
 * hover, so the site's tonal surfaces have nothing to say here; hierarchy
 * comes from size, weight and the gutter. One cobalt rule under the masthead
 * is the entire chromatic budget.
 */

const translations: Record<Locale, typeof it> = { it, en };

interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Print palette. `signal` is cobalt, matching the site's one accent. */
const INK: RGB = { r: 23, g: 25, b: 26 };
const MUTED: RGB = { r: 78, g: 83, b: 86 };
const FAINT: RGB = { r: 122, g: 126, b: 129 };
const RULE: RGB = { r: 198, g: 200, b: 195 };
const SIGNAL: RGB = { r: 28, g: 81, b: 184 };

// ---- Geometry, all in mm on A4 ----
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 18;
const MARGIN_TOP = 18;
const MARGIN_BOTTOM = 18;
/** Width of the left column that carries dates and period labels. */
const GUTTER = 30;
const BODY_X = MARGIN_X + GUTTER;
const BODY_W = PAGE_W - MARGIN_X - BODY_X;
const FULL_W = PAGE_W - MARGIN_X * 2;
/** Leading as a multiple of font size, converted to mm at call sites. */
const LEADING = 1.42;

const PT_TO_MM = 0.352_777_8;
const lineHeight = (pt: number) => pt * PT_TO_MM * LEADING;

const setFace = (doc: jsPDF, weight: 'normal' | 'bold', pt: number, color: RGB) => {
  doc.setFont('Roboto', weight);
  doc.setFontSize(pt);
  doc.setTextColor(color.r, color.g, color.b);
};

const rule = (doc: jsPDF, x: number, y: number, w: number, color: RGB, weight = 0.2) => {
  doc.setDrawColor(color.r, color.g, color.b);
  doc.setLineWidth(weight);
  doc.line(x, y, x + w, y);
};

export const generateCV = async (locale: Locale = 'it'): Promise<void> => {
  const t = translations[locale];
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  await registerRobotoFont(doc);
  doc.setLineHeightFactor(LEADING);

  let y = MARGIN_TOP;

  /**
   * Reserves vertical space, breaking the page when it will not fit. Callers
   * pass the height of the whole block they are about to draw, not one line,
   * so a heading can never be orphaned at the foot of a page.
   */
  const reserve = (needed: number) => {
    if (y + needed <= PAGE_H - MARGIN_BOTTOM) return;
    doc.addPage();
    y = MARGIN_TOP;
  };

  /** Wrapped body copy in the content track. Returns the height consumed. */
  const paragraph = (text: string, pt = 9, color: RGB = INK, x = BODY_X, w = BODY_W) => {
    setFace(doc, 'normal', pt, color);
    const lines = doc.splitTextToSize(text, w) as string[];
    const h = lines.length * lineHeight(pt);
    reserve(h);
    doc.text(lines, x, y);
    y += h;
    return h;
  };

  /** Measures wrapped copy without drawing, so `reserve` can see a whole block. */
  const measure = (text: string, pt: number, w: number) => {
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(pt);
    return (doc.splitTextToSize(text, w) as string[]).length * lineHeight(pt);
  };

  /** Section head: tracked uppercase label over a full-width hairline. */
  const section = (label: string) => {
    reserve(20);
    y += 7;
    setFace(doc, 'bold', 8.5, INK);
    doc.text(label.toUpperCase(), MARGIN_X, y, { charSpace: 0.32 });
    y += 1.9;
    rule(doc, MARGIN_X, y, FULL_W, RULE);
    y += 5.6;
  };

  /**
   * The gutter track is narrow and its content is free text from the locale
   * files, so it wraps rather than overrunning: one experience period reads
   * "26/11/2017 - 10/12/2017 - 10/02/2018" and printed straight through the
   * job title beside it when this drew a single unwrapped line.
   */
  const GUTTER_TEXT_W = GUTTER - 4;

  const measureGutter = (text: string) => {
    if (!text) return 0;
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(8);
    return (doc.splitTextToSize(text, GUTTER_TEXT_W) as string[]).length * lineHeight(8);
  };

  /** Draws the gutter label at the current baseline. Returns its height. */
  const gutter = (text: string) => {
    if (!text) return 0;
    setFace(doc, 'normal', 8, MUTED);
    const lines = doc.splitTextToSize(text, GUTTER_TEXT_W) as string[];
    doc.text(lines, MARGIN_X, y);
    return lines.length * lineHeight(8);
  };

  /**
   * `t.cvData.labels.*` are stored upper-case because they are section heads.
   * `availability` is the one used as a gutter label, where every neighbour
   * ("Stack principale", "Italiano", "Gennaio 2025") is sentence case.
   */
  const sentenceCase = (label: string) =>
    label.charAt(0) + label.slice(1).toLocaleLowerCase(locale);

  /**
   * One dated entry: period in the gutter, title and subtitle in the content
   * track, optional description below.
   */
  const entry = (opts: {
    period?: string;
    title: string;
    subtitle?: string;
    description?: string;
    titlePt?: number;
  }) => {
    const titlePt = opts.titlePt ?? 10;
    const contentH =
      lineHeight(titlePt) +
      (opts.subtitle ? lineHeight(9) : 0) +
      (opts.description ? 0.8 + measure(opts.description, 9, BODY_W) : 0);
    const gutterH = measureGutter(opts.period ?? '');
    reserve(Math.max(contentH, gutterH) + 2);

    const top = y;
    gutter(opts.period ?? '');

    setFace(doc, 'bold', titlePt, INK);
    doc.text(opts.title, BODY_X, y);
    y += lineHeight(titlePt);

    if (opts.subtitle) {
      setFace(doc, 'normal', 9, MUTED);
      doc.text(opts.subtitle, BODY_X, y);
      y += lineHeight(9);
    }

    if (opts.description) {
      y += 0.8;
      paragraph(opts.description, 9, INK);
    }

    // A wrapped period can be taller than its entry; never let the next row
    // start inside it.
    y = Math.max(y, top + gutterH);
    y += 3.4;
  };

  /** A label in the gutter against a single run of copy. Used for the lists. */
  const definition = (label: string, value: string) => {
    const labelH = measureGutter(label);
    const valueH = Math.max(measure(value, 9, BODY_W), lineHeight(9));
    reserve(Math.max(labelH, valueH) + 1.5);
    const top = y;
    gutter(label);
    paragraph(value, 9, INK);
    y = Math.max(y, top + labelH);
    y += 1.5;
  };

  /**
   * Lays out `segments` on one line, separated by a middot, wrapping to the
   * next line when the row is full. Segments carrying a `url` become links.
   */
  const inlineRow = (
    segments: { text: string; url?: string }[],
    pt: number,
    color: RGB,
    x = MARGIN_X,
    w = FULL_W,
  ) => {
    setFace(doc, 'normal', pt, color);
    const sepW = doc.getTextWidth('  ·  ');
    let cx = x;
    let drewOnLine = false;

    for (const seg of segments) {
      if (!seg.text) continue;
      const segW = doc.getTextWidth(seg.text);

      if (drewOnLine && cx + sepW + segW > x + w) {
        y += lineHeight(pt);
        cx = x;
        drewOnLine = false;
      }
      if (drewOnLine) {
        setFace(doc, 'normal', pt, FAINT);
        doc.text('  ·  ', cx, y);
        cx += sepW;
      }

      setFace(doc, 'normal', pt, color);
      if (seg.url) {
        doc.textWithLink(seg.text, cx, y, { url: seg.url });
      } else {
        doc.text(seg.text, cx, y);
      }
      cx += segW;
      drewOnLine = true;
    }
    y += lineHeight(pt);
  };

  // ================= MASTHEAD =================
  const firstName =
    siteConfig.personal.firstName || siteConfig.personal.fullName.split(' ')[0];
  const lastName =
    siteConfig.personal.lastName ||
    siteConfig.personal.fullName.split(' ').slice(1).join(' ');

  setFace(doc, 'bold', 21, INK);
  doc.text(`${firstName} ${lastName}`.toUpperCase(), MARGIN_X, y, { charSpace: 0.22 });
  y += 7.6;

  setFace(doc, 'normal', 10.5, MUTED);
  doc.text(siteConfig.personal.titles[0] || 'Software Engineer', MARGIN_X, y);
  y += 4.2;

  rule(doc, MARGIN_X, y, FULL_W, SIGNAL, 0.6);
  y += 5.4;

  inlineRow(
    [
      { text: siteConfig.personal.location },
      { text: siteConfig.contact.phoneDisplay },
      {
        text: siteConfig.contact.email,
        url: siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : undefined,
      },
    ],
    8.5,
    MUTED,
  );

  inlineRow(
    [
      {
        text: siteConfig.social.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
        url: siteConfig.social.linkedin || undefined,
      },
      {
        text: siteConfig.social.github.replace(/^https?:\/\/(www\.)?/, ''),
        url: siteConfig.social.github || undefined,
      },
      { text: siteConfig.url.replace(/^https?:\/\/(www\.)?/, ''), url: siteConfig.url },
    ],
    8.5,
    MUTED,
  );

  // ================= PROFILE =================
  if (t.cvData.profile) {
    section(t.cvData.labels.profile);
    paragraph(t.cvData.profile, 9, INK, MARGIN_X, FULL_W);
  }

  // ================= EXPERIENCE =================
  if (t.experience.items.length > 0) {
    section(t.cvData.labels.workExperience);
    for (const exp of t.experience.items) {
      entry({
        period: exp.date,
        title: exp.title,
        subtitle: exp.company,
        description: exp.description,
      });
    }
  }

  // ================= EDUCATION =================
  if (t.cvData.education.length > 0) {
    section(t.cvData.labels.education);
    for (const edu of t.cvData.education) {
      entry({
        period: edu.period,
        title: edu.title,
        subtitle: [edu.institution, edu.location].filter(Boolean).join(' · '),
        description: edu.description,
      });
    }
  }

  // ================= PROJECTS =================
  if (projectsData.length > 0) {
    section(t.cvData.labels.projects);
    for (const project of projectsData) {
      const localized = t.projects.items[project.id];
      entry({
        title: localized?.title ?? project.title,
        subtitle: project.technologies.join(' · '),
        description: localized?.description ?? project.description,
      });
      // Sits under the entry it belongs to, in the content track.
      y -= 1.6;
      inlineRow(
        [
          {
            text: project.githubLink.replace(/^https?:\/\/(www\.)?/, ''),
            url: project.githubLink,
          },
          project.liveDemo
            ? { text: project.liveDemo.replace(/^https?:\/\/(www\.)?/, ''), url: project.liveDemo }
            : { text: '' },
        ],
        8,
        SIGNAL,
        BODY_X,
        BODY_W,
      );
      y += 2.6;
    }
  }

  // ================= SKILLS =================
  // Grouped by tier, in words. Within a tier, declaration order in
  // `skillsData` decides reading order, which is deliberate there.
  const skillIndex = new Map(skillsData.map((s, i) => [s.name, i]));
  const byTier = (tier: SkillTier) =>
    skillsData
      .filter((s) => s.tier === tier)
      .sort((a, b) => {
        const groupDiff = GROUP_RANK[a.group] - GROUP_RANK[b.group];
        if (groupDiff !== 0) return groupDiff;
        return (skillIndex.get(a.name) ?? 0) - (skillIndex.get(b.name) ?? 0);
      })
      .map((s) => s.name);

  const tiers: SkillTier[] = (['core', 'regular', 'occasional'] as SkillTier[]).sort(
    (a, b) => TIER_RANK[b] - TIER_RANK[a],
  );

  if (skillsData.length > 0) {
    section(t.cvData.labels.technicalSkills);
    for (const tier of tiers) {
      const names = byTier(tier);
      if (names.length === 0) continue;
      definition(t.about.skills.tiers[tier], names.join(', '));
    }
  }

  // ================= LANGUAGES =================
  if (t.cvData.languages.length > 0) {
    section(t.cvData.labels.languages);
    for (const lang of t.cvData.languages) {
      definition(lang.name, lang.level);
    }
  }

  // ================= CERTIFICATIONS =================
  if (t.certifications.items.length > 0) {
    section(t.cvData.labels.certifications);
    const sorted = [...t.certifications.items].sort(
      (a, b) => parseDateString(b.date, locale).getTime() - parseDateString(a.date, locale).getTime(),
    );
    for (const cert of sorted) {
      entry({ period: cert.date, title: cert.title, subtitle: cert.issuer, titlePt: 9.5 });
    }
  }

  // ================= SOFT SKILLS =================
  if (t.cvData.softSkills.length > 0) {
    section(t.cvData.labels.softSkills);
    paragraph(t.cvData.softSkills.join(' · '), 9, INK, MARGIN_X, FULL_W);
  }

  // ================= PERSONAL DETAILS & AVAILABILITY =================
  const details: string[] = [];
  if (siteConfig.personal.birthDate) {
    details.push(`${t.cvData.labels.bornOn} ${siteConfig.personal.birthDate}`);
  }
  if (t.cvData.personal.nationality) {
    details.push(`${t.cvData.labels.nationality}: ${t.cvData.personal.nationality}`);
  }
  if (t.cvData.personal.maritalStatus) {
    details.push(`${t.cvData.labels.maritalStatus}: ${t.cvData.personal.maritalStatus}`);
  }
  if (t.cvData.personal.drivingLicense) {
    details.push(
      `${t.cvData.personal.drivingLicense}${
        siteConfig.personal.hasVehicle ? t.cvData.personal.vehicleNote : ''
      }`,
    );
  }

  const availability = siteConfig.personal.availability;
  const availabilityItems = [
    availability?.immediateStart ? t.cvData.labels.immediateStart : '',
    availability?.willingToTravel ? t.cvData.labels.willingToTravel : '',
    availability?.willingToRelocate ? t.cvData.labels.willingToRelocate : '',
  ].filter(Boolean);

  if (details.length > 0 || availabilityItems.length > 0) {
    section(t.cvData.labels.info);
    if (details.length > 0) paragraph(details.join(' · '), 9, INK, MARGIN_X, FULL_W);
    if (availabilityItems.length > 0) {
      y += 1.4;
      definition(sentenceCase(t.cvData.labels.availability), availabilityItems.join(' · '));
    }
  }

  // ================= PRIVACY CLAUSE =================
  // Foot of the final page, whichever that turned out to be.
  if (t.cvData.labels.privacyClause) {
    setFace(doc, 'normal', 6.5, FAINT);
    const lines = doc.splitTextToSize(t.cvData.labels.privacyClause, FULL_W) as string[];
    const h = lines.length * lineHeight(6.5);
    const footY = PAGE_H - MARGIN_BOTTOM + 6;

    // Only push to a new page if the clause would collide with the content.
    if (footY - h < y) {
      doc.addPage();
      y = MARGIN_TOP;
    }
    doc.text(lines, MARGIN_X, footY - h);
  }

  const fileName = `CV_${siteConfig.personal.fullName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};

/**
 * Certification dates are localized month names ("Gennaio 2025"), so they
 * cannot be handed to `Date.parse`. Unrecognised input sorts to the far past
 * rather than throwing, which keeps one bad string from dropping the section.
 */
function parseDateString(dateStr: string, locale: Locale): Date {
  const months: Record<Locale, string[]> = {
    it: [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre',
    ],
    en: [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december',
    ],
  };

  const parts = dateStr.toLowerCase().trim().split(/\s+/);
  if (parts.length === 2) {
    const month = months[locale].indexOf(parts[0]);
    const year = Number.parseInt(parts[1], 10);
    if (month !== -1 && Number.isFinite(year)) return new Date(year, month, 1);
  }
  return new Date(1900, 0, 1);
}

import jsPDF from 'jspdf';
import { siteConfig } from '@/config/site';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experiences';
import { certificationData } from '@/data/certifications';
import { projectsData } from '@/data/projects';
import { educationData } from '@/data/education';

// ============ PROFESSIONAL CV GENERATOR ============
// Modern two-column layout - Single page compact design

// Color palette
const colors = {
  sidebar: { r: 30, g: 58, b: 95 } as RGB,      // Dark navy blue
  sidebarText: { r: 255, g: 255, b: 255 } as RGB, // White
  sidebarMuted: { r: 180, g: 195, b: 210 } as RGB, // Light gray-blue
  accent: { r: 64, g: 180, b: 229 } as RGB,      // Cyan accent
  heading: { r: 30, g: 58, b: 95 } as RGB,       // Navy for headings
  text: { r: 40, g: 40, b: 40 } as RGB,          // Dark gray
  muted: { r: 100, g: 100, b: 100 } as RGB,      // Medium gray
  light: { r: 150, g: 150, b: 150 } as RGB,      // Light gray
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Layout constants
const PAGE_WIDTH = 210; // A4 width in mm
const PAGE_HEIGHT = 297; // A4 height in mm
const SIDEBAR_WIDTH = 65;
const CONTENT_LEFT = SIDEBAR_WIDTH + 6;
const CONTENT_WIDTH = PAGE_WIDTH - CONTENT_LEFT - 8;
const SIDEBAR_PADDING = 6;

export const generateCV = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let sidebarY = 12;
  let contentY = 12;

  // ============ DRAW SIDEBAR BACKGROUND ============
  doc.setFillColor(colors.sidebar.r, colors.sidebar.g, colors.sidebar.b);
  doc.rect(0, 0, SIDEBAR_WIDTH, PAGE_HEIGHT, 'F');

  // ============ SIDEBAR CONTENT ============
  
  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
  
  const firstName = siteConfig.personal.firstName || siteConfig.personal.fullName.split(' ')[0];
  const lastName = siteConfig.personal.lastName || siteConfig.personal.fullName.split(' ').slice(1).join(' ');
  
  doc.text(firstName.toUpperCase(), SIDEBAR_PADDING, sidebarY);
  sidebarY += 5;
  doc.text(lastName.toUpperCase(), SIDEBAR_PADDING, sidebarY);
  sidebarY += 6;

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
  const title = siteConfig.personal.titles[0] || 'Software Engineer';
  doc.text(title, SIDEBAR_PADDING, sidebarY);
  sidebarY += 10;

  // ============ CONTACT SECTION ============
  sidebarY = drawSidebarSection(doc, 'CONTATTI', sidebarY);
  
  if (siteConfig.personal.location) {
    sidebarY = drawSidebarItem(doc, '●', siteConfig.personal.location, sidebarY);
  }
  if (siteConfig.contact.phoneDisplay) {
    sidebarY = drawSidebarItem(doc, '●', siteConfig.contact.phoneDisplay, sidebarY);
  }
  if (siteConfig.contact.email) {
    sidebarY = drawSidebarItem(doc, '●', siteConfig.contact.email, sidebarY, true);
  }

  sidebarY += 5;

  // ============ SOCIAL LINKS ============
  sidebarY = drawSidebarSection(doc, 'SOCIAL', sidebarY);
  
  if (siteConfig.social.linkedin) {
    sidebarY = drawSidebarItem(doc, '●', 'LinkedIn', sidebarY, false, siteConfig.social.linkedin);
  }
  if (siteConfig.social.github) {
    sidebarY = drawSidebarItem(doc, '●', 'GitHub', sidebarY, false, siteConfig.social.github);
  }

  sidebarY += 5;

  // ============ SKILLS SECTION ============
  sidebarY = drawSidebarSection(doc, 'COMPETENZE', sidebarY);
  
  const sortedSkills = [...skillsData].sort((a, b) => b.percentage - a.percentage);
  
  sortedSkills.forEach(skill => {
    if (sidebarY > PAGE_HEIGHT - 10) return;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
    doc.text(skill.name, SIDEBAR_PADDING, sidebarY);
    
    // Draw skill level indicator (dots)
    const maxDots = 5;
    const filledDots = Math.round((skill.percentage / 100) * maxDots);
    const dotStartX = SIDEBAR_WIDTH - SIDEBAR_PADDING - 18;
    
    for (let i = 0; i < maxDots; i++) {
      if (i < filledDots) {
        doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
      } else {
        doc.setFillColor(colors.sidebarMuted.r, colors.sidebarMuted.g, colors.sidebarMuted.b);
      }
      doc.circle(dotStartX + (i * 3.5), sidebarY - 0.8, 1.2, 'F');
    }
    
    sidebarY += 4.5;
  });

  // ============ MAIN CONTENT AREA ============
  
  // Profile Section
  contentY = drawContentSection(doc, 'PROFILO', contentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
  
  const profileLines = doc.splitTextToSize(siteConfig.personal.cvProfile, CONTENT_WIDTH);
  doc.text(profileLines, CONTENT_LEFT, contentY);
  contentY += profileLines.length * 3.5 + 6;

  // ============ EDUCATION SECTION ============
  contentY = drawContentSection(doc, 'ISTRUZIONE', contentY);
  
  educationData.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
    doc.text(edu.title, CONTENT_LEFT, contentY);
    contentY += 3.5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
    doc.text(`${edu.institution} | ${edu.period}`, CONTENT_LEFT, contentY);
    contentY += 6;
  });

  // ============ WORK EXPERIENCE SECTION ============
  if (experienceData.length > 0) {
    contentY = drawContentSection(doc, 'ESPERIENZA LAVORATIVA', contentY);
    
    experienceData.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(exp.title, CONTENT_LEFT, contentY);
      contentY += 3.5;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(`${exp.company} | ${exp.date}`, CONTENT_LEFT, contentY);
      contentY += 3.5;
      
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const descLines = doc.splitTextToSize(exp.description, CONTENT_WIDTH);
      doc.text(descLines, CONTENT_LEFT, contentY);
      contentY += descLines.length * 3.5 + 5;
    });
  }

  // ============ PROJECTS SECTION ============
  if (projectsData.length > 0) {
    contentY = drawContentSection(doc, 'PROGETTI', contentY);
    
    projectsData.forEach((project) => {
      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(project.title, CONTENT_LEFT, contentY);
      contentY += 3.5;
      
      // Description (truncated for space)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const shortDesc = project.description.length > 120 
        ? project.description.substring(0, 120) + '...' 
        : project.description;
      const descLines = doc.splitTextToSize(shortDesc, CONTENT_WIDTH);
      doc.text(descLines, CONTENT_LEFT, contentY);
      contentY += descLines.length * 3 + 2;
      
      // Technologies (inline)
      doc.setFontSize(7);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      const techText = `Tecnologie: ${project.technologies.slice(0, 4).join(', ')}`;
      doc.text(techText, CONTENT_LEFT, contentY);
      
      // GitHub link (same line)
      doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
      const linkText = project.githubLink.replace('https://github.com/', '');
      const techWidth = doc.getTextWidth(techText + '  |  ');
      doc.textWithLink(linkText, CONTENT_LEFT + techWidth, contentY, { url: project.githubLink });
      contentY += 5;
    });
  }

  // ============ CERTIFICATIONS SECTION ============
  if (certificationData.length > 0) {
    contentY = drawContentSection(doc, 'CERTIFICAZIONI', contentY);
    
    const sortedCerts = [...certificationData].sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Display certifications in a compact inline format
    sortedCerts.forEach((cert) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      
      // Truncate title if too long
      const maxTitleLen = 50;
      const certTitle = cert.title.length > maxTitleLen 
        ? cert.title.substring(0, maxTitleLen) + '...' 
        : cert.title;
      doc.text(certTitle, CONTENT_LEFT, contentY);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(` — ${cert.issuer}, ${cert.date}`, CONTENT_LEFT + doc.getTextWidth(certTitle), contentY);
      contentY += 4;
    });
  }

  // Save the PDF
  const fileName = `CV_${siteConfig.personal.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// ============ HELPER FUNCTIONS ============

function drawSidebarSection(doc: jsPDF, title: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
  doc.text(title, SIDEBAR_PADDING, y);
  
  doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  doc.setLineWidth(0.4);
  doc.line(SIDEBAR_PADDING, y + 1.5, SIDEBAR_WIDTH - SIDEBAR_PADDING, y + 1.5);
  
  return y + 6;
}

function drawSidebarItem(
  doc: jsPDF, 
  bullet: string, 
  text: string, 
  y: number, 
  isSmall: boolean = false,
  linkUrl?: string
): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(isSmall ? 6.5 : 7);
  doc.setTextColor(colors.sidebarMuted.r, colors.sidebarMuted.g, colors.sidebarMuted.b);
  
  doc.setFontSize(5);
  doc.text(bullet, SIDEBAR_PADDING, y - 0.3);
  
  doc.setFontSize(isSmall ? 6.5 : 7);
  const textX = SIDEBAR_PADDING + 3;
  const maxWidth = SIDEBAR_WIDTH - SIDEBAR_PADDING - textX - 1;
  
  let displayText = text;
  while (doc.getTextWidth(displayText) > maxWidth && displayText.length > 10) {
    displayText = displayText.slice(0, -1);
  }
  if (displayText !== text) {
    displayText += '...';
  }
  
  if (linkUrl) {
    doc.textWithLink(displayText, textX, y, { url: linkUrl });
  } else {
    doc.text(displayText, textX, y);
  }
  
  return y + 4;
}

function drawContentSection(doc: jsPDF, title: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
  doc.text(title, CONTENT_LEFT, y);
  
  doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  doc.setLineWidth(0.6);
  doc.line(CONTENT_LEFT, y + 1.5, CONTENT_LEFT + 30, y + 1.5);
  
  return y + 7;
}

function parseDateString(dateStr: string): Date {
  const monthMap: { [key: string]: number } = {
    'gennaio': 0, 'febbraio': 1, 'marzo': 2, 'aprile': 3,
    'maggio': 4, 'giugno': 5, 'luglio': 6, 'agosto': 7,
    'settembre': 8, 'ottobre': 9, 'novembre': 10, 'dicembre': 11
  };

  const parts = dateStr.toLowerCase().trim().split(' ');

  if (parts.length === 2) {
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1], 10);

    if (month !== undefined && !isNaN(year)) {
      return new Date(year, month, 1);
    }
  }

  return new Date(1900, 0, 1);
}

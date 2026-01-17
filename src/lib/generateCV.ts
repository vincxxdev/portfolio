import jsPDF from 'jspdf';
import { siteConfig } from '@/config/site';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experiences';
import { certificationData } from '@/data/certifications';
import { projectsData } from '@/data/projects';
import { educationData } from '@/data/education';

// ============ PROFESSIONAL CV GENERATOR ============
// Modern two-column layout with sidebar design

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
const SIDEBAR_WIDTH = 70;
const CONTENT_LEFT = SIDEBAR_WIDTH + 8;
const CONTENT_WIDTH = PAGE_WIDTH - CONTENT_LEFT - 10;
const SIDEBAR_PADDING = 8;

export const generateCV = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let sidebarY = 20;
  let contentY = 20;

  // ============ DRAW SIDEBAR BACKGROUND ============
  const drawSidebarBackground = () => {
    doc.setFillColor(colors.sidebar.r, colors.sidebar.g, colors.sidebar.b);
    doc.rect(0, 0, SIDEBAR_WIDTH, PAGE_HEIGHT, 'F');
  };

  drawSidebarBackground();

  // ============ SIDEBAR CONTENT ============
  
  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
  
  const firstName = siteConfig.personal.firstName || siteConfig.personal.fullName.split(' ')[0];
  const lastName = siteConfig.personal.lastName || siteConfig.personal.fullName.split(' ').slice(1).join(' ');
  
  doc.text(firstName.toUpperCase(), SIDEBAR_PADDING, sidebarY);
  sidebarY += 7;
  doc.text(lastName.toUpperCase(), SIDEBAR_PADDING, sidebarY);
  sidebarY += 10;

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
  const title = siteConfig.personal.titles[0] || 'Software Engineer';
  doc.text(title, SIDEBAR_PADDING, sidebarY);
  sidebarY += 15;

  // ============ CONTACT SECTION ============
  sidebarY = drawSidebarSection(doc, 'CONTATTI', sidebarY);
  
  // Location
  if (siteConfig.personal.location) {
    sidebarY = drawSidebarItem(doc, '●', siteConfig.personal.location, sidebarY);
  }
  
  // Phone
  if (siteConfig.contact.phoneDisplay) {
    sidebarY = drawSidebarItem(doc, '●', siteConfig.contact.phoneDisplay, sidebarY);
  }
  
  // Email
  if (siteConfig.contact.email) {
    sidebarY = drawSidebarItem(doc, '●', siteConfig.contact.email, sidebarY, true);
  }

  sidebarY += 8;

  // ============ SOCIAL LINKS ============
  sidebarY = drawSidebarSection(doc, 'SOCIAL', sidebarY);
  
  if (siteConfig.social.linkedin) {
    const linkedinUsername = siteConfig.social.linkedin.replace('https://www.linkedin.com/in/', '').replace('https://linkedin.com/in/', '').replace('/', '');
    sidebarY = drawSidebarItem(doc, '●', `linkedin.com/in/${linkedinUsername}`, sidebarY, true, siteConfig.social.linkedin);
  }
  
  if (siteConfig.social.github) {
    const githubUsername = siteConfig.social.github.replace('https://github.com/', '').replace('/', '');
    sidebarY = drawSidebarItem(doc, '●', `github.com/${githubUsername}`, sidebarY, true, siteConfig.social.github);
  }

  sidebarY += 8;

  // ============ SKILLS SECTION ============
  sidebarY = drawSidebarSection(doc, 'COMPETENZE', sidebarY);
  
  // Group and sort skills by expertise level
  const sortedSkills = [...skillsData].sort((a, b) => b.percentage - a.percentage);
  
  sortedSkills.forEach(skill => {
    if (sidebarY > PAGE_HEIGHT - 20) return; // Prevent overflow
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
    doc.text(skill.name, SIDEBAR_PADDING, sidebarY);
    
    // Draw skill level indicator (dots)
    const maxDots = 5;
    const filledDots = Math.round((skill.percentage / 100) * maxDots);
    const dotStartX = SIDEBAR_WIDTH - SIDEBAR_PADDING - 20;
    
    for (let i = 0; i < maxDots; i++) {
      if (i < filledDots) {
        doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
      } else {
        doc.setFillColor(colors.sidebarMuted.r, colors.sidebarMuted.g, colors.sidebarMuted.b);
      }
      doc.circle(dotStartX + (i * 4.5), sidebarY - 1, 1.5, 'F');
    }
    
    sidebarY += 6;
  });

  // ============ MAIN CONTENT AREA ============
  
  // Profile Section
  contentY = drawContentSection(doc, 'PROFILO', contentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
  
  const profileLines = doc.splitTextToSize(siteConfig.personal.cvProfile, CONTENT_WIDTH);
  doc.text(profileLines, CONTENT_LEFT, contentY);
  contentY += profileLines.length * 5 + 10;

  // ============ EDUCATION SECTION ============
  contentY = drawContentSection(doc, 'ISTRUZIONE', contentY);
  
  educationData.forEach((edu) => {
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
    doc.text(edu.title, CONTENT_LEFT, contentY);
    contentY += 5;
    
    // Institution and period
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
    doc.text(`${edu.institution} | ${edu.period}`, CONTENT_LEFT, contentY);
    contentY += 5;
    
    // Description
    if (edu.description) {
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const descLines = doc.splitTextToSize(edu.description, CONTENT_WIDTH);
      doc.text(descLines, CONTENT_LEFT, contentY);
      contentY += descLines.length * 4.5 + 5;
    }
    
    contentY += 3;
  });

  contentY += 5;

  // ============ WORK EXPERIENCE SECTION ============
  if (experienceData.length > 0) {
    contentY = checkPageBreak(doc, contentY, 40, drawSidebarBackground);
    contentY = drawContentSection(doc, 'ESPERIENZA LAVORATIVA', contentY);
    
    experienceData.forEach((exp) => {
      contentY = checkPageBreak(doc, contentY, 30, drawSidebarBackground);
      
      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(exp.title, CONTENT_LEFT, contentY);
      contentY += 5;
      
      // Company and date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(`${exp.company} | ${exp.date}`, CONTENT_LEFT, contentY);
      contentY += 5;
      
      // Description
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const descLines = doc.splitTextToSize(exp.description, CONTENT_WIDTH);
      doc.text(descLines, CONTENT_LEFT, contentY);
      contentY += descLines.length * 4.5 + 8;
    });
  }

  // ============ PROJECTS SECTION ============
  if (projectsData.length > 0) {
    contentY = checkPageBreak(doc, contentY, 40, drawSidebarBackground);
    contentY = drawContentSection(doc, 'PROGETTI', contentY);
    
    projectsData.forEach((project) => {
      contentY = checkPageBreak(doc, contentY, 35, drawSidebarBackground);
      
      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(project.title, CONTENT_LEFT, contentY);
      contentY += 5;
      
      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const descLines = doc.splitTextToSize(project.description, CONTENT_WIDTH);
      doc.text(descLines, CONTENT_LEFT, contentY);
      contentY += descLines.length * 4.5 + 3;
      
      // Technologies
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text('Tecnologie: ', CONTENT_LEFT, contentY);
      
      doc.setFont('helvetica', 'normal');
      const techText = project.technologies.join(', ');
      const techWidth = doc.getTextWidth('Tecnologie: ');
      doc.text(techText, CONTENT_LEFT + techWidth, contentY);
      contentY += 5;
      
      // GitHub link
      doc.setFont('helvetica', 'bold');
      doc.text('GitHub: ', CONTENT_LEFT, contentY);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
      const linkText = project.githubLink.replace('https://', '');
      const linkX = CONTENT_LEFT + doc.getTextWidth('GitHub: ');
      doc.textWithLink(linkText, linkX, contentY, { url: project.githubLink });
      contentY += 8;
    });
  }

  // ============ CERTIFICATIONS SECTION ============
  if (certificationData.length > 0) {
    contentY = checkPageBreak(doc, contentY, 50, drawSidebarBackground);
    contentY = drawContentSection(doc, 'CERTIFICAZIONI', contentY);
    
    // Sort by date (most recent first)
    const sortedCerts = [...certificationData].sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    sortedCerts.forEach((cert) => {
      contentY = checkPageBreak(doc, contentY, 15, drawSidebarBackground);
      
      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(cert.title, CONTENT_LEFT, contentY);
      contentY += 4.5;
      
      // Issuer and date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(`${cert.issuer} | ${cert.date}`, CONTENT_LEFT, contentY);
      contentY += 7;
    });
  }

  // ============ FOOTER ON ALL PAGES ============
  const pageCount = doc.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Page number (only on main content area)
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(colors.light.r, colors.light.g, colors.light.b);
    doc.text(
      `${i} / ${pageCount}`,
      PAGE_WIDTH - 15,
      PAGE_HEIGHT - 8
    );
  }

  // Save the PDF
  const fileName = `CV_${siteConfig.personal.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// ============ HELPER FUNCTIONS ============

function drawSidebarSection(doc: jsPDF, title: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
  doc.text(title, SIDEBAR_PADDING, y);
  
  // Accent underline
  doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  doc.setLineWidth(0.5);
  doc.line(SIDEBAR_PADDING, y + 2, SIDEBAR_WIDTH - SIDEBAR_PADDING, y + 2);
  
  return y + 8;
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
  doc.setFontSize(isSmall ? 8 : 9);
  doc.setTextColor(colors.sidebarMuted.r, colors.sidebarMuted.g, colors.sidebarMuted.b);
  
  // Bullet
  doc.setFontSize(6);
  doc.text(bullet, SIDEBAR_PADDING, y - 0.5);
  
  // Text (with optional link)
  doc.setFontSize(isSmall ? 8 : 9);
  const textX = SIDEBAR_PADDING + 4;
  const maxWidth = SIDEBAR_WIDTH - SIDEBAR_PADDING - textX - 2;
  
  // Truncate if too long
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
  
  return y + 5;
}

function drawContentSection(doc: jsPDF, title: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
  doc.text(title, CONTENT_LEFT, y);
  
  // Accent underline
  doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  doc.setLineWidth(0.8);
  doc.line(CONTENT_LEFT, y + 2, CONTENT_LEFT + 40, y + 2);
  
  return y + 10;
}

function checkPageBreak(
  doc: jsPDF, 
  currentY: number, 
  requiredSpace: number,
  drawSidebar: () => void
): number {
  if (currentY + requiredSpace > PAGE_HEIGHT - 20) {
    doc.addPage();
    drawSidebar();
    return 20;
  }
  return currentY;
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

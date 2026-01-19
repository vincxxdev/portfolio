import jsPDF from 'jspdf';
import { siteConfig } from '@/config/site';
import { educationData } from '@/data/education';
import { certificationData } from '@/data/certifications';
import { languagesData } from '@/data/languages';
import { simplifiedCVData } from '@/data/simplifiedCVData';
import { registerRobotoFont } from '@/lib/fonts/roboto';

// ============ SIMPLIFIED CV GENERATOR ============
// Optimized for administrative/office positions

// Color palette
const colors = {
  sidebar: { r: 30, g: 58, b: 95 } as RGB,
  sidebarText: { r: 255, g: 255, b: 255 } as RGB,
  sidebarMuted: { r: 180, g: 195, b: 210 } as RGB,
  accent: { r: 64, g: 180, b: 229 } as RGB,
  heading: { r: 30, g: 58, b: 95 } as RGB,
  text: { r: 40, g: 40, b: 40 } as RGB,
  muted: { r: 100, g: 100, b: 100 } as RGB,
  light: { r: 150, g: 150, b: 150 } as RGB,
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Layout constants
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const SIDEBAR_WIDTH = 65;
const CONTENT_LEFT = SIDEBAR_WIDTH + 6;
const CONTENT_WIDTH = PAGE_WIDTH - CONTENT_LEFT - 8;
const SIDEBAR_PADDING = 6;

export const generateSimplifiedCV = async (): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  await registerRobotoFont(doc);

  let sidebarY = 12;
  let contentY = 12;

  // ============ DRAW SIDEBAR BACKGROUND ============
  doc.setFillColor(colors.sidebar.r, colors.sidebar.g, colors.sidebar.b);
  doc.rect(0, 0, SIDEBAR_WIDTH, PAGE_HEIGHT, 'F');

  // ============ SIDEBAR CONTENT ============
  
  // Name
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
  
  const firstName = siteConfig.personal.firstName || siteConfig.personal.fullName.split(' ')[0];
  const lastName = siteConfig.personal.lastName || siteConfig.personal.fullName.split(' ').slice(1).join(' ');
  
  doc.text(firstName.toUpperCase(), SIDEBAR_PADDING, sidebarY);
  sidebarY += 5;
  doc.text(lastName.toUpperCase(), SIDEBAR_PADDING, sidebarY);
  sidebarY += 6;

  // Title - Simplified version
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
  const titleLines = doc.splitTextToSize(simplifiedCVData.title, SIDEBAR_WIDTH - SIDEBAR_PADDING * 2);
  doc.text(titleLines, SIDEBAR_PADDING, sidebarY);
  sidebarY += titleLines.length * 3 + 6;

  // ============ PERSONAL INFO SECTION ============
  sidebarY = drawSidebarSection(doc, 'INFORMAZIONI', sidebarY);
  
  if (siteConfig.personal.birthDate) {
    sidebarY = drawSidebarItem(doc, '●', `Nato il ${siteConfig.personal.birthDate}`, sidebarY);
  }
  if (siteConfig.personal.nationality) {
    sidebarY = drawSidebarItem(doc, '●', `Nazionalità: ${siteConfig.personal.nationality}`, sidebarY);
  }
  if (siteConfig.personal.maritalStatus) {
    sidebarY = drawSidebarItem(doc, '●', `Stato civile: ${siteConfig.personal.maritalStatus}`, sidebarY);
  }
  if (siteConfig.personal.drivingLicense) {
    const vehicleText = siteConfig.personal.hasVehicle ? ' (Automunito)' : '';
    sidebarY = drawSidebarItem(doc, '●', `${siteConfig.personal.drivingLicense}${vehicleText}`, sidebarY);
  }

  sidebarY += 4;

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

  sidebarY += 4;

  // ============ LANGUAGES SECTION ============
  sidebarY = drawSidebarSection(doc, 'LINGUE', sidebarY);
  
  languagesData.forEach(lang => {
    if (sidebarY > PAGE_HEIGHT - 10) return;
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.sidebarText.r, colors.sidebarText.g, colors.sidebarText.b);
    doc.text(lang.name, SIDEBAR_PADDING, sidebarY);
    
    doc.setFontSize(6.5);
    doc.setTextColor(colors.sidebarMuted.r, colors.sidebarMuted.g, colors.sidebarMuted.b);
    const levelText = lang.level;
    const textWidth = doc.getTextWidth(levelText);
    doc.text(levelText, SIDEBAR_WIDTH - SIDEBAR_PADDING - textWidth, sidebarY);
    
    sidebarY += 4;
  });

  sidebarY += 4;

  // ============ COMPETENZE SECTION - Office Skills ============
  sidebarY = drawSidebarSection(doc, 'COMPETENZE', sidebarY);
  
  simplifiedCVData.skills.forEach(skill => {
    if (sidebarY > PAGE_HEIGHT - 10) return;
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(7.5);
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
      doc.circle(dotStartX + (i * 3.5), sidebarY - 0.8, 1.1, 'F');
    }
    
    sidebarY += 4;
  });

  // ============ MAIN CONTENT AREA ============
  
  // Profile Section with accent marker
  doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
  doc.rect(CONTENT_LEFT - 3, contentY - 3, 1.5, 12, 'F');
  
  contentY = drawContentSection(doc, 'PROFILO', contentY);
  
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
  
  const profileLines = doc.splitTextToSize(simplifiedCVData.profile, CONTENT_WIDTH);
  doc.text(profileLines, CONTENT_LEFT, contentY);
  contentY += profileLines.length * 3.5 + 8;

  // ============ EDUCATION SECTION ============
  contentY = drawContentSection(doc, 'ISTRUZIONE', contentY);
  
  educationData.forEach((edu, index) => {
    doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
    doc.circle(CONTENT_LEFT - 1.5, contentY - 0.5, 1.2, 'F');
    
    if (index < educationData.length - 1) {
      doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
      doc.setLineWidth(0.3);
      doc.line(CONTENT_LEFT - 1.5, contentY + 1, CONTENT_LEFT - 1.5, contentY + 12);
    }
    
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
    doc.text(edu.title, CONTENT_LEFT + 2, contentY);
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
    const periodWidth = doc.getTextWidth(edu.period);
    doc.text(edu.period, CONTENT_LEFT + CONTENT_WIDTH - periodWidth, contentY);
    
    contentY += 4;
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
    doc.text(edu.institution, CONTENT_LEFT + 2, contentY);
    contentY += 7;
  });

  // ============ WORK EXPERIENCE SECTION ============
  if (simplifiedCVData.experience.length > 0) {
    contentY = drawContentSection(doc, 'ESPERIENZA LAVORATIVA', contentY);
    
    simplifiedCVData.experience.forEach((exp) => {
      doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
      doc.circle(CONTENT_LEFT - 1.5, contentY - 0.5, 1.2, 'F');
      
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(exp.title, CONTENT_LEFT + 2, contentY);
      
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
      const dateWidth = doc.getTextWidth(exp.date);
      doc.text(exp.date, CONTENT_LEFT + CONTENT_WIDTH - dateWidth, contentY);
      
      contentY += 4;
      
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(exp.company, CONTENT_LEFT + 2, contentY);
      contentY += 4;
      
      doc.setFont('Roboto', 'normal');
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const descLines = doc.splitTextToSize(exp.description, CONTENT_WIDTH - 4);
      doc.text(descLines, CONTENT_LEFT + 2, contentY);
      contentY += descLines.length * 3.5 + 6;
    });
  }

  // ============ PROJECTS SECTION ============
  if (simplifiedCVData.projects.length > 0) {
    contentY = drawContentSection(doc, 'PROGETTI', contentY);
    
    simplifiedCVData.projects.forEach((project) => {
      doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
      doc.circle(CONTENT_LEFT - 1.5, contentY - 0.5, 1.2, 'F');
      
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(project.title, CONTENT_LEFT + 2, contentY);
      contentY += 4;
      
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      const descLines = doc.splitTextToSize(project.description, CONTENT_WIDTH - 4);
      doc.text(descLines, CONTENT_LEFT + 2, contentY);
      contentY += descLines.length * 3.5 + 2;
      
      // Skill tags instead of tech tags
      let tagX = CONTENT_LEFT + 2;
      const tagY = contentY;
      const maxTagWidth = CONTENT_WIDTH - 4;
      
      project.technologies.forEach((tech, techIndex) => {
        doc.setFontSize(7);
        const techWidth = doc.getTextWidth(tech) + 4;
        
        if (tagX + techWidth > CONTENT_LEFT + maxTagWidth && techIndex > 0) {
          return;
        }
        
        doc.setFillColor(240, 245, 250);
        doc.roundedRect(tagX, tagY - 2.5, techWidth, 4, 0.5, 0.5, 'F');
        
        doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
        doc.setLineWidth(0.2);
        doc.roundedRect(tagX, tagY - 2.5, techWidth, 4, 0.5, 0.5, 'S');
        
        doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
        doc.text(tech, tagX + 2, tagY);
        
        tagX += techWidth + 2;
      });
      contentY += 7;
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
    
    sortedCerts.forEach((cert) => {
      doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
      doc.circle(CONTENT_LEFT - 1.5, contentY - 0.5, 1.2, 'F');
      
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text(cert.title, CONTENT_LEFT + 2, contentY);
      
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
      const dateWidth = doc.getTextWidth(cert.date);
      doc.text(cert.date, CONTENT_LEFT + CONTENT_WIDTH - dateWidth, contentY);
      
      contentY += 3.5;
      
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(cert.issuer, CONTENT_LEFT + 2, contentY);
      contentY += 5;
    });
  }

  // ============ AVAILABILITY SECTION ============
  const availability = siteConfig.personal.availability;
  if (availability) {
    const availabilityItems: string[] = [];
    
    if (availability.immediateStart) {
      availabilityItems.push('Disponibilità immediata');
    }
    if (availability.willingToTravel) {
      availabilityItems.push('Disponibile a trasferte');
    }
    if (availability.willingToRelocate) {
      availabilityItems.push('Disponibile al trasferimento');
    }
    
    if (availabilityItems.length > 0) {
      contentY += 2;
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(colors.heading.r, colors.heading.g, colors.heading.b);
      doc.text('DISPONIBILITÀ', CONTENT_LEFT, contentY);
      
      doc.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
      doc.setLineWidth(0.6);
      doc.line(CONTENT_LEFT, contentY + 1.5, CONTENT_LEFT + 30, contentY + 1.5);
      contentY += 7;
      
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      doc.text(availabilityItems.join('  •  '), CONTENT_LEFT, contentY);
      contentY += 6;
    }
  }

  // ============ PRIVACY CLAUSE ============
  if (siteConfig.personal.privacyClause) {
    const privacyY = PAGE_HEIGHT - 8;
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(colors.light.r, colors.light.g, colors.light.b);
    
    const privacyLines = doc.splitTextToSize(siteConfig.personal.privacyClause, CONTENT_WIDTH);
    doc.text(privacyLines, CONTENT_LEFT, privacyY);
  }

  // Save the PDF
  const fileName = `CV_Semplificato_${siteConfig.personal.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// ============ HELPER FUNCTIONS ============

function drawSidebarSection(doc: jsPDF, title: string, y: number): number {
  doc.setFont('Roboto', 'bold');
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
  isSmall: boolean = false
): number {
  doc.setFont('Roboto', 'normal');
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
  
  doc.text(displayText, textX, y);
  
  return y + 4;
}

function drawContentSection(doc: jsPDF, title: string, y: number): number {
  doc.setFont('Roboto', 'bold');
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

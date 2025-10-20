import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { siteConfig } from '@/config/site';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experiences';
import { certificationData } from '@/data/certifications';
import { projectsData } from '@/data/projects';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

export const generateCV = (): void => {
    const doc = new jsPDF();
  
    // Color configuration
    const primaryColor: [number, number, number] = [34, 211, 238]; // cyan-400
    const secondaryColor: [number, number, number] = [37, 99, 235]; // blue-600
    const textColor: [number, number, number] = [31, 41, 55]; // gray-800
    const lightGray: [number, number, number] = [243, 244, 246]; // gray-100

    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // ============ HEADER SECTION ============
    // Name
    doc.setFontSize(28);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(siteConfig.personal.fullName, margin, yPosition);
    yPosition += 8;

    // Subtitle (use roles from configuration)
    doc.setFontSize(12);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'normal');
    const subtitle = siteConfig.personal.titles.join(' | ');
    doc.text(subtitle, margin, yPosition);
    yPosition += 10;

    // Separator line
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // ============ CONTACT INFORMATION ============
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');

    const contactInfo = [];
    if (siteConfig.personal.location) contactInfo.push(siteConfig.personal.location);
    if (siteConfig.contact.email) contactInfo.push(siteConfig.contact.email);
    if (siteConfig.contact.phoneDisplay) contactInfo.push(siteConfig.contact.phoneDisplay);

    const contactLine = contactInfo.join('  |  ');
    doc.text(contactLine, margin, yPosition);
    yPosition += 5;

    // Social links
    const socialInfo = [];
    if (siteConfig.social.github) socialInfo.push(`GitHub: ${siteConfig.social.github}`);
    if (siteConfig.social.linkedin) socialInfo.push(`LinkedIn: ${siteConfig.social.linkedin}`);

    if (socialInfo.length > 0) {
    const socialLine = socialInfo.join('  |  ');
    doc.text(socialLine, margin, yPosition);
    yPosition += 12;
    } else {
    yPosition += 7;
    }

    // ============ PROFILE / ABOUT ============
    addSectionTitle(doc, 'PROFILO', yPosition, margin, contentWidth, primaryColor, lightGray);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');

    // Use CV profile from centralized configuration
    const splitProfile = doc.splitTextToSize(siteConfig.personal.cvProfile, contentWidth);
    doc.text(splitProfile, margin, yPosition);
    yPosition += splitProfile.length * 5 + 8;

    // ============ TECHNICAL SKILLS ============
    addSectionTitle(doc, 'COMPETENZE TECNICHE', yPosition, margin, contentWidth, primaryColor, lightGray);
    yPosition += 10;

    // Group skills by level
    const expertSkills = skillsData.filter(s => s.percentage >= 70).map(s => s.name);
    const intermediateSkills = skillsData.filter(s => s.percentage >= 50 && s.percentage < 70).map(s => s.name);
    const basicSkills = skillsData.filter(s => s.percentage < 50).map(s => s.name);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    if (expertSkills.length > 0) {
    doc.text('Avanzato:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const expertText = doc.splitTextToSize(expertSkills.join(', '), contentWidth - 25);
    doc.text(expertText, margin + 25, yPosition);
    yPosition += expertText.length * 5 + 3;
    }

    if (intermediateSkills.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text('Intermedio:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const intermediateText = doc.splitTextToSize(intermediateSkills.join(', '), contentWidth - 25);
    doc.text(intermediateText, margin + 25, yPosition);
    yPosition += intermediateText.length * 5 + 3;
    }

    if (basicSkills.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text('Base:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const basicText = doc.splitTextToSize(basicSkills.join(', '), contentWidth - 25);
    doc.text(basicText, margin + 25, yPosition);
    yPosition += basicText.length * 5 + 8;
    } else {
    yPosition += 5;
    }

    // ============ WORK EXPERIENCE ============
    if (experienceData.length > 0) {
    // Check if a new page is needed
    if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
    }

    addSectionTitle(doc, 'ESPERIENZA LAVORATIVA', yPosition, margin, contentWidth, primaryColor, lightGray);
    yPosition += 10;

    experienceData.forEach((exp) => {
        // Check if a new page is needed before each experience
        if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
        }
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...secondaryColor);
        doc.text(exp.title, margin, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...textColor);
        doc.text(`${exp.company} | ${exp.date}`, margin, yPosition);
        yPosition += 6;
        
        doc.setFont('helvetica', 'normal');
        const descText = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(descText, margin, yPosition);
        yPosition += descText.length * 5 + 6;
    });

    yPosition += 2;
    }

    // ============ PROJECTS ============
    if (projectsData.length > 0) {
    // Check if a new page is needed
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    addSectionTitle(doc, 'PROGETTI', yPosition, margin, contentWidth, primaryColor, lightGray);
    yPosition += 10;

    projectsData.forEach((project) => {
        // Check if a new page is needed before each project
        if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
        }
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...secondaryColor);
        doc.text(project.title, margin, yPosition);
        yPosition += 6;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
        const descText = doc.splitTextToSize(project.description, contentWidth);
        doc.text(descText, margin, yPosition);
        yPosition += descText.length * 5 + 4;
        
        // Technologies
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.text('Tecnologie: ', margin, yPosition);
        
        doc.setFont('helvetica', 'normal');
        const techText = project.technologies.join(', ');
        const splitTech = doc.splitTextToSize(techText, contentWidth - 25);
        doc.text(splitTech, margin + 25, yPosition);
        yPosition += splitTech.length * 4 + 4;
        
        // GitHub link (clickable)
        doc.setFont('helvetica', 'bold');
        doc.text('GitHub: ', margin, yPosition);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...primaryColor);
        // Add clickable link
        const linkText = project.githubLink.replace('https://', '');
        doc.textWithLink(linkText, margin + 18, yPosition, { url: project.githubLink });
        yPosition += 5;
        
        // If there's a live demo, add it
        if (project.liveDemo) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...textColor);
        doc.text('Demo: ', margin, yPosition);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...primaryColor);
        const demoText = project.liveDemo.replace('https://', '');
        doc.textWithLink(demoText, margin + 15, yPosition, { url: project.liveDemo });
        yPosition += 5;
        }
        
        yPosition += 5; // Space between projects
    });

    yPosition += 2;
    }

    // ============ CERTIFICATIONS ============
    if (certificationData.length > 0) {
    // Check if a new page is needed
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    addSectionTitle(doc, 'CERTIFICAZIONI', yPosition, margin, contentWidth, primaryColor, lightGray);
    yPosition += 10;

    // Sort certifications from most recent to least recent
    const sortedCertifications = [...certificationData].sort((a, b) => {
        const dateA = parseDateString(a.date);
        const dateB = parseDateString(b.date);
        return dateB.getTime() - dateA.getTime(); // Descending order (most recent first)
    });

    // Use autoTable for a clean certifications table
    autoTable(doc, {
        startY: yPosition,
        head: [['Certificazione', 'Ente', 'Data']],
        body: sortedCertifications.map(cert => [
        cert.title,
        cert.issuer,
        cert.date
        ]),
        theme: 'striped',
        headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
        },
        bodyStyles: {
        fontSize: 9,
        textColor: textColor
        },
        alternateRowStyles: {
        fillColor: lightGray
        },
        margin: { left: margin, right: margin },
        tableWidth: contentWidth
    });
    }

    // ============ FOOTER ============
    const pageCount = doc.getNumberOfPages();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Page number
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'italic');
    doc.text(
        `Pagina ${i} di ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
    );

    // Automatic generation note (only on last page)
    if (i === pageCount) {
        doc.setFontSize(7);
        doc.setTextColor(120, 120, 120);
        doc.setFont('helvetica', 'normal');
        
        // Separator line above the note
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
        
        // Note text
        const noteText = `Questo CV e generato automaticamente utilizzando TypeScript e jsPDF, garantendo dati sempre aggiornati e sincronizzati con il portfolio online su ${siteConfig.url.replace('https://', '').replace('http://', '')}`;
        const splitNote = doc.splitTextToSize(noteText, contentWidth);
        doc.text(splitNote, pageWidth / 2, pageHeight - 16, { align: 'center' });
    }
    }

    // Save the PDF
    const fileName = `CV_${siteConfig.personal.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};

// Helper function to add section titles
function addSectionTitle(
    doc: jsPDF,
    title: string,
    yPos: number,
    margin: number,
    width: number,
    color: [number, number, number],
    bgColor: [number, number, number]
): void {
    // Colored background for the title
    doc.setFillColor(...bgColor);
    doc.rect(margin, yPos - 5, width, 8, 'F');

    // Title text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...color);
    doc.text(title, margin + 2, yPos);
}

// Helper function to parse dates in "Month Year" format (e.g., "Gennaio 2025")
function parseDateString(dateStr: string): Date {
    const monthMap: { [key: string]: number } = {
    'gennaio': 0,
    'febbraio': 1,
    'marzo': 2,
    'aprile': 3,
    'maggio': 4,
    'giugno': 5,
    'luglio': 6,
    'agosto': 7,
    'settembre': 8,
    'ottobre': 9,
    'novembre': 10,
    'dicembre': 11
    };

    const parts = dateStr.toLowerCase().trim().split(' ');

    if (parts.length === 2) {
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1], 10);

    if (month !== undefined && !isNaN(year)) {
        return new Date(year, month, 1);
    }
    }

    // Fallback: if format is not recognized, return a very old date
    return new Date(1900, 0, 1);
}

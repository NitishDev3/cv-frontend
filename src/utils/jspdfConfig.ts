import jsPDF from "jspdf";
import type { ICVData } from "../types/cv";

export const genratePDF = (cvData: ICVData) => {
  const doc = new jsPDF();

  const {
    basicDetails,
    profileSummary,
    skills,
    experience,
    education,
    projects,
    socialProfiles,
  } = cvData;

  let y = 20;

  // Header - Basic Details
  doc.setFontSize(16);
  doc.text(basicDetails.name || "", 10, y);
  y += 10;
  doc.text(basicDetails.designation || "", 10, y);
  y += 10;

  doc.setFontSize(12);
  const contactDetails = `${basicDetails.email} | ${basicDetails.phone} | ${basicDetails.city}`;
  doc.text(contactDetails, 10, y);
  y += 15;

  // Profile Summary
  doc.setFontSize(14);
  doc.text("Professional Summary", 10, y);
  y += 10;
  doc.setFontSize(12);
  const summaryLines = doc.splitTextToSize(profileSummary.summary || "", 180);
  doc.text(summaryLines, 10, y);
  y += summaryLines.length * 7;

  // Skills
  doc.setFontSize(14);
  doc.text("Skills", 10, y);
  y += 10;
  doc.setFontSize(12);
  const skillsText = skills
    .map((s) => `${s.name} (${s.proficiency}/100)`)
    .join(", ");
  const skillsLines = doc.splitTextToSize(skillsText, 180);
  doc.text(skillsLines, 10, y);
  y += skillsLines.length * 7;

  // Experience
  doc.setFontSize(14);
  doc.text("Experience", 10, y);
  y += 10;
  doc.setFontSize(12);
  experience.forEach((exp) => {
    doc.text(`${exp.title} at ${exp.company}`, 10, y);
    y += 7;
    doc.text(
      `${exp.location} | ${exp.startDate} - ${
        exp.current ? "Present" : exp.endDate
      }`,
      10,
      y
    );
    y += 7;
    exp.roleDescription.forEach((line) => {
      const descLines = doc.splitTextToSize(`- ${line}`, 180);
      doc.text(descLines, 10, y);
      y += descLines.length * 7;
    });
    y += 5;
  });

  // Education
  doc.setFontSize(14);
  doc.text("Education", 10, y);
  y += 10;
  doc.setFontSize(12);
  education.forEach((edu) => {
    doc.text(`${edu.degree} in ${edu.field}`, 10, y);
    y += 7;
    doc.text(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 10, y);
    y += 7;
    doc.text(`Grade: ${edu.grade}`, 10, y);
    y += 10;
  });

  // Projects
  doc.setFontSize(14);
  doc.text("Projects", 10, y);
  y += 10;
  doc.setFontSize(12);
  projects.forEach((project) => {
    doc.text(project.name, 10, y);
    y += 7;
    if (project.description) {
      const descLines = doc.splitTextToSize(project.description, 180);
      doc.text(descLines, 10, y);
      y += descLines.length * 7;
    }
    doc.text(`Tech: ${project.technologies.join(", ")}`, 10, y);
    y += 7;
    if (project.url) {
      doc.text(`URL: ${project.url}`, 10, y);
      y += 7;
    }
    y += 5;
  });

  // Social Profiles
  doc.setFontSize(14);
  doc.text("Social Profiles", 10, y);
  y += 10;
  doc.setFontSize(12);
  socialProfiles.forEach((profile) => {
    doc.text(`${profile.platform}: ${profile.url}`, 10, y);
    y += 7;
  });

  // Save PDF
  doc.save(`${basicDetails.name || "cv"}.pdf`);
};

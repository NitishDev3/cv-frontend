import React from "react";
import { Box, Typography, Chip, Divider, Stack } from "@mui/material";

type ResumeData = {
  fullName?: string;
  city?: string;
  email?: string;
  mobile?: string;
  linkedIn?: string;
  github?: string;
  summary?: string;
  skills?: string[];
  experience?: {
    company: string;
    from: string;
    to: string;
    current: boolean;
    description: string;
  }[];
  education?: {
    institution: string;
    major: string;
    passoutYear: string;
    cgpa: string;
  }[];
  achievements?: string;
};

interface LiveResumePreviewProps {
  formData: ResumeData;
}

const LiveResumePreview: React.FC<LiveResumePreviewProps> = ({ formData }) => {
  return (
    <Box
      id="resume-preview"
      sx={{
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        bgcolor: "#fff",
        width: "100%",
        minHeight: "90vh",
        overflowY: "auto",
        boxShadow: 2,
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">
        {formData.fullName || "Your Name"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {formData.city} | {formData.email} | {formData.mobile}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {formData.linkedIn} | {formData.github}
      </Typography>

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Professional Summary */}
      {formData.summary && (
        <>
          <Typography variant="h6" fontWeight="bold">
            Professional Summary
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {formData.summary}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Skills */}
      {formData.skills && formData.skills.length > 0 && (
        <>
          <Typography variant="h6" fontWeight="bold">
            Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
            {formData.skills.map((skill, i) => (
              <Chip key={i} label={skill} sx={{ m: 0.5 }} />
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Experience */}
      {formData.experience && formData.experience.length > 0 && (
        <>
          <Typography variant="h6" fontWeight="bold">
            Experience
          </Typography>
          {formData.experience.map((exp, i) => (
            <Box key={i} mt={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                {exp.company}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {exp.from} - {exp.current ? "Present" : exp.to}
              </Typography>
              <ul style={{ marginTop: 4 }}>
                {exp.description
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => (
                    <li key={index}>
                      <Typography variant="body2">{line}</Typography>
                    </li>
                  ))}
              </ul>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Education */}
      {formData.education && formData.education.length > 0 && (
        <>
          <Typography variant="h6" fontWeight="bold">
            Education
          </Typography>
          {formData.education.map((edu, i) => (
            <Box key={i} mt={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.institution}
              </Typography>
              <Typography variant="body2">
                {edu.major}, {edu.passoutYear} | CGPA: {edu.cgpa}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Achievements */}
      {formData.achievements && (
        <>
          <Typography variant="h6" fontWeight="bold">
            Achievements
          </Typography>
          <ul>
            {formData.achievements
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((ach, i) => (
                <li key={i}>
                  <Typography variant="body2">{ach}</Typography>
                </li>
              ))}
          </ul>
        </>
      )}
    </Box>
  );
};

export default LiveResumePreview;

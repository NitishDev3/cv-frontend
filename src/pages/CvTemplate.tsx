import React from "react";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Stack,
  Link,
} from "@mui/material";

import type {
  IExperienceEntry,
  IEducationEntry,
  IProjectEntry,
  ISocialProfile,
  ICvPreviewProps,
} from "../types/cv"; // adjust the path based on your project structure



const CVTemplate = ({ cvData }: ICvPreviewProps) => {
  const {
    basicDetails,
    education,
    experience,
    projects,
    skills,
    socialProfiles,
    profileSummary,
  } = cvData;

  return (
    <Box p={4} maxWidth={900} mx="auto" fontFamily="Arial">
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">
        {basicDetails.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {basicDetails.email} | {basicDetails.phone} | {basicDetails.city}
      </Typography>
      <Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
        {socialProfiles.map((profile: ISocialProfile, index: number) => (
          <Link
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener"
            underline="hover"
            color="primary"
          >
            {profile.platform}
          </Link>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Summary */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Professional Summary
      </Typography>
      <Typography variant="body2" color="text.primary">
        {profileSummary?.summary}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Skills */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Skills
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {skills[0]?.skills.map((skill, index) => (
          <Chip key={index} label={skill.name} variant="outlined" />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Experience */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Experience
      </Typography>
      {experience.map((exp: IExperienceEntry, index: number) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {exp.title}, {exp.company} - {exp.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {exp.startDate} – {exp.current ? "Present" : exp.endDate}
          </Typography>
          <ul>
            {exp.roleDescription.map((desc: string, idx: number) => (
              <li key={idx}>
                <Typography variant="body2">{desc}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Projects */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Projects
      </Typography>
      {projects.map((project: IProjectEntry, index: number) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
          <Typography variant="body2" mt={0.5}>
            <strong>Technologies:</strong> {project.technologies.join(", ")}
          </Typography>
          {project.url && (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              {project.url}
            </Link>
          )}
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Education */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Education
      </Typography>
      {education.map((edu: IEducationEntry, index: number) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {edu.degree} in {edu.field}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {edu.institution}
          </Typography>
          <Typography variant="body2">
            {edu.startDate} – {edu.endDate}
          </Typography>
          <Typography variant="body2">CGPA: {edu.grade}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CVTemplate;

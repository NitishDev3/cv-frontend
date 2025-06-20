import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import { type ICvPreviewProps } from "../types/cv";

interface ResumeTemplateProps extends ICvPreviewProps {}

const TemplateChefResume: React.FC<ResumeTemplateProps> = ({ cvData }) => {
  const { basicDetails, education, experience, projects, skills, socialProfiles } = cvData;

  return (
    <Box
      sx={{
        width: "21cm",
        minHeight: "29.7cm",
        padding: 4,
        backgroundColor: "white",
        fontFamily: "Georgia, serif",
        color: "#222",
      }}
    >
      {/* Header */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar src={basicDetails.image} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight="bold">
            {basicDetails.name}
          </Typography>
          <Typography variant="body1">{basicDetails.designation}</Typography>
          <Typography variant="body2">
            {basicDetails.city} | {basicDetails.phone} | {basicDetails.email}
          </Typography>
        </Grid>
      </Grid>

      {/* Work Experience */}
      <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
        Work Experience
      </Typography>
      {experience.map((job) => (
        <Box key={job.id} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {job.title} @ {job.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.startDate} – {job.current ? "Present" : job.endDate} | {job.location}
          </Typography>
          <Typography variant="body2" mt={1}>{job.roleDescription}</Typography>
        </Box>
      ))}

      {/* Certifications */}
      {/* You can add similar logic for certifications when present in data */}

      {/* Education */}
      <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
        Education
      </Typography>
      {education.map((edu) => (
        <Box key={edu.id} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {edu.degree} in {edu.field}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {edu.institution} | {edu.endDate} | {edu.grade}
          </Typography>
        </Box>
      ))}

      {/* Skills */}
      <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
        Skills
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {skills.map((group) =>
          group.skills.map((skill, idx) => (
            <Chip
              key={group.id + idx}
              label={`${skill.name} (${skill.proficiency}/100)`}
              size="small"
            />
          ))
        )}
      </Stack>

      {/* Projects */}
      <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
        Projects
      </Typography>
      {projects.map((proj) => (
        <Box key={proj.id} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {proj.name} {proj.url && (<a href={proj.url} target="_blank" rel="noreferrer">🔗</a>)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {proj.startDate} - {proj.endDate || "Ongoing"}
          </Typography>
          {proj.description && <Typography variant="body2">{proj.description}</Typography>}
          <Stack direction="row" spacing={1} mt={1}>
            {proj.technologies.map((tech, idx) => (
              <Chip key={idx} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ))}

      {/* Social Profiles */}
      <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
        Social Profiles
      </Typography>
      {socialProfiles.map((profile) => (
        <Typography key={profile.id} variant="body2">
          {profile.platform}: <a href={profile.url}>{profile.url}</a>
        </Typography>
      ))}
    </Box>
  );
};

export default TemplateChefResume;
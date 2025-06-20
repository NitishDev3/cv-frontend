import { Box, Paper, Typography, Avatar, Grid as MuiGrid, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';

const CvPreview = () => {
  const cvData = useSelector((state: RootState) => state.cv);
  const { basicDetails, education, experience, projects, skills, socialProfiles } = cvData;

  return (
    <Paper sx={{ p: 4, height: '100%', overflow: 'auto' }}>
      {/* Basic Details */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={basicDetails.image}
            alt={basicDetails.name}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {basicDetails.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {basicDetails.designation}
            </Typography>
          </Box>
        </Box>
        <MuiGrid container spacing={2}>
          <MuiGrid sx={{ xs: 12, sm: 6 }}>
            <Typography variant="body2">
              <strong>Email:</strong> {basicDetails.email}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> {basicDetails.phone}
            </Typography>
          </MuiGrid>
        </MuiGrid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Education */}
      {education.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Education
          </Typography>
          {education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 2 }}>
              <Typography variant="h6">{edu.degree}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {edu.field}
              </Typography>
              <Typography variant="body1">{edu.institution}</Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.startDate} - {edu.endDate}
              </Typography>
              {edu.grade && (
                <Typography variant="body2">
                  <strong>Grade:</strong> {edu.grade}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Experience */}
      {experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Work Experience
          </Typography>
          {experience.map((exp) => (
            <Box key={exp.id} sx={{ mb: 3 }}>
              <Typography variant="h6">{exp.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {exp.company} - {exp.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {exp.roleDescription}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Projects */}
      {projects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          {projects.map((project) => (
            <Box key={project.id} sx={{ mb: 3 }}>
              <Typography variant="h6">{project.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {project.technologies.join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.startDate} - {project.endDate || 'Ongoing'}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {project.description}
              </Typography>
              {project.url && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Skills */}
      {skills.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Skills
          </Typography>
          <MuiGrid container spacing={2}>
            {skills.map((category) => (
              <MuiGrid sx={{ xs: 12, sm: 6 }} key={category.id}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.skills.map((skill, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {skill.name} ({skill.proficiency}/10)
                    </Typography>
                  ))}
                </Box>
              </MuiGrid>
            ))}
          </MuiGrid>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Social Profiles */}
      {socialProfiles.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Social Profiles
          </Typography>
          <MuiGrid container spacing={2}>
            {socialProfiles.map((profile) => (
              <MuiGrid sx={{ xs: 12, sm: 6 }} key={profile.id}>
                <Typography variant="subtitle1">{profile.platform}</Typography>
              </MuiGrid>
            ))}
          </MuiGrid>
        </Box>
      )}
    </Paper>
  );
};

export default CvPreview;

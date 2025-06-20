// import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid as MuiGrid,
  IconButton,
  Paper,
  Chip,
  Autocomplete
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { IProjectEntry } from '../../types/cv';
import { nanoid } from 'nanoid';

interface ProjectsProps {
  data: IProjectEntry[];
  onChange: (data: IProjectEntry[]) => void;
}

const Projects = ({ data, onChange }: ProjectsProps) => {
  const addProject = () => {
    const newProject: IProjectEntry = {
      id: nanoid(6),
      name: '',
      description: null,
      technologies: [],
      startDate: null,
      endDate: null,
      url: null,
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id));
  };

  const updateProject = (id: string, field: keyof IProjectEntry, value: any) => {
    onChange(
      data.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addProject}
        >
          Add Project
        </Button>
      </Box>

      {data.map((project, index) => (
        <Paper
          key={project.id}
          sx={{ p: 2, mb: 2, position: 'relative' }}
          elevation={1}
        >
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => removeProject(project.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" gutterBottom>
            Project #{index + 1}
          </Typography>

          <MuiGrid container spacing={2}>
            <MuiGrid sx={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                label="Project Name"
                value={project.name}
                onChange={(e) => updateProject(project.id!, 'name', e.target.value)}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={project.description || ''}
                onChange={(e) => updateProject(project.id!, 'description', e.target.value)}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={project.technologies}
                onChange={(_, newValue) => updateProject(project.id!, 'technologies', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Technologies Used"
                    helperText="Add technologies, frameworks, and tools used"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Start Date"
                type="month"
                value={project.startDate || ''}
                onChange={(e) => updateProject(project.id!, 'startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="End Date"
                type="month"
                value={project.endDate || ''}
                onChange={(e) => updateProject(project.id!, 'endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Project URL"
                value={project.url || ''}
                onChange={(e) => updateProject(project.id!, 'url', e.target.value)}
                helperText="Link to the project (GitHub, live demo, etc.)"
              />
            </MuiGrid>
          </MuiGrid>
        </Paper>
      ))}

      {data.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No projects added yet. Click "Add Project" to get started.
        </Typography>
      )}
    </Box>
  );
};

export default Projects; 
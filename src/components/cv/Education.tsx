// import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid as MuiGrid,
  IconButton,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { IEducationEntry } from '../../types/cv';
import { nanoid } from 'nanoid';

interface EducationProps {
  data: IEducationEntry[];
  onChange: (data: IEducationEntry[]) => void;
}

const Education = ({ data, onChange }: EducationProps) => {
  const addEducation = () => {
    const newEducation: IEducationEntry = {
      id: nanoid(6),
      degree: '',
      field: '',
      institution: '',
      startDate: '',
      endDate: '',
      grade: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof IEducationEntry, value: string) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Education</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addEducation}
        >
          Add Education
        </Button>
      </Box>

      {data.map((education, index) => (
        <Paper
          key={education.id}
          sx={{ p: 2, mb: 2, position: 'relative' }}
          elevation={1}
        >
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => removeEducation(education.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" gutterBottom>
            Education #{index + 1}
          </Typography>

          <MuiGrid container spacing={2}>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Degree"
                value={education.degree}
                onChange={(e) => updateEducation(education.id!, 'degree', e.target.value)}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Field of Study"
                value={education.field}
                onChange={(e) => updateEducation(education.id!, 'field', e.target.value)}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                label="Institution"
                value={education.institution}
                onChange={(e) => updateEducation(education.id!, 'institution', e.target.value)}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Start Date"
                type="month"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id!, 'startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="End Date"
                type="month"
                value={education.endDate}
                onChange={(e) => updateEducation(education.id!, 'endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Grade/CGPA"
                value={education.grade}
                onChange={(e) => updateEducation(education.id!, 'grade', e.target.value)}
              />
            </MuiGrid>
          </MuiGrid>
        </Paper>
      ))}

      {data.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No education entries added yet. Click "Add Education" to get started.
        </Typography>
      )}
    </Box>
  );
};

export default Education; 
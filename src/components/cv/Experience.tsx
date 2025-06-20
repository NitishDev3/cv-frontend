// import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid as MuiGrid,
  IconButton,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { IExperienceEntry } from '../../types/cv';
import { nanoid } from 'nanoid';

interface ExperienceProps {
  data: IExperienceEntry[];
  onChange: (data: IExperienceEntry[]) => void;
}

const Experience = ({ data, onChange }: ExperienceProps) => {

  const addExperience = () => {
    const newExperience: IExperienceEntry = {
      id: nanoid(6),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      roleDescription: [],
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof IExperienceEntry, value: any) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Work Experience</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addExperience}
        >
          Add Experience
        </Button>
      </Box>

      {data.map((experience, index) => (
        <Paper
          key={experience.id}
          sx={{ p: 2, mb: 2, position: "relative" }}
          elevation={1}
        >
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => removeExperience(experience.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" gutterBottom>
            Experience #{index + 1}
          </Typography>

          <MuiGrid container spacing={2}>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Job Title"
                value={experience.title}
                onChange={(e) =>
                  updateExperience(experience.id!, "title", e.target.value)
                }
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Company"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(experience.id!, "company", e.target.value)
                }
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                label="Location"
                value={experience.location}
                onChange={(e) =>
                  updateExperience(experience.id!, "location", e.target.value)
                }
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Start Date"
                type="month"
                value={experience.startDate}
                onChange={(e) =>
                  updateExperience(experience.id!, "startDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="End Date"
                type="month"
                value={experience.endDate}
                onChange={(e) =>
                  updateExperience(experience.id!, "endDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                disabled={experience.current}
              />
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={experience.current}
                    onChange={(e) =>
                      updateExperience(
                        experience.id!,
                        "current",
                        e.target.checked
                      )
                    }
                  />
                }
                label="I currently work here"
              />
            </MuiGrid>

            {/* TODO: add role description input should be an array of strings PS: line change will result in new line in the text field and one line will be added to the array */}

            <MuiGrid xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Role Description"
                value={(Array.isArray(experience.roleDescription)
                  ? experience.roleDescription
                  : []
                ).join("\n")}
                onChange={(e) =>
                  updateExperience(
                    experience.id!,
                    "roleDescription",
                    e.target.value.split("\n")
                  )
                }
                helperText="Each new line will be saved as a separate responsibility/achievement"
              />
            </MuiGrid>
          </MuiGrid>
        </Paper>
      ))}

      {data.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No work experience added yet. Click "Add Experience" to get started.
        </Typography>
      )}
    </Box>
  );
};

export default Experience; 
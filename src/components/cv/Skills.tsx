// import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid as MuiGrid,
  IconButton,
  Paper,
  Slider,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { ISkillsEntry, ISkillObject } from '../../types/cv';

interface SkillsProps {
  data: ISkillsEntry[];
  onChange: (data: ISkillsEntry[]) => void;
}

const Skills = ({ data, onChange }: SkillsProps) => {
  const addSkillEntry = () => {
    const newEntry: ISkillsEntry = {
      id: nanoid(6),
      skills: [],
    };
    onChange([...data, newEntry]);
  };

  const removeSkillEntry = (id: string) => {
    onChange(data.filter((entry) => entry.id !== id));
  };

  const addSkill = (entryId: string) => {
    onChange(
      data.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              skills: [...entry.skills, { id: nanoid(6), name: '', proficiency: 0 }],
            }
          : entry
      )
    );
  };

  const removeSkill = (entryId: string, skillIndex: number) => {
    onChange(
      data.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              skills: entry.skills.filter((_, i) => i !== skillIndex),
            }
          : entry
      )
    );
  };

  const updateSkill = (entryId: string, skillIndex: number, field: keyof ISkillObject, value: string | number) => {
    onChange(
      data.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              skills: entry.skills.map((skill, i) =>
                i === skillIndex ? { ...skill, [field]: value } : skill
              ),
            }
          : entry
      )
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Skills</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addSkillEntry}
        >
          Add Skills
        </Button>
      </Box>

      {data.map((entry, index) => (
        <Paper
          key={entry.id}
          sx={{ p: 2, mb: 2, position: 'relative' }}
          elevation={1}
        >
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => removeSkillEntry(entry.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" gutterBottom>
            Skills Set #{index + 1}
          </Typography>

          <MuiGrid container spacing={2}>
            {entry.skills.map((skill, skillIndex) => (
              <MuiGrid key={skillIndex} sx={{ xs: 12 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label={`Skill ${skillIndex + 1}`}
                    value={skill.name}
                    onChange={(e) => updateSkill(entry.id!, skillIndex, 'name', e.target.value)}
                    placeholder="Enter a skill"
                  />
                  <Box sx={{ minWidth: 200 }}>
                    <Typography gutterBottom>Proficiency</Typography>
                    <Slider
                      value={skill.proficiency}
                      onChange={(_, value) => updateSkill(entry.id!, skillIndex, 'proficiency', value as number)}
                      min={0}
                      max={100}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                    />
                  </Box>
                  <IconButton
                    onClick={() => removeSkill(entry.id!, skillIndex)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </MuiGrid>
            ))}
            <MuiGrid sx={{ xs: 12 }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addSkill(entry.id!)}
                sx={{ mt: 1 }}
              >
                Add Skill
              </Button>
            </MuiGrid>
          </MuiGrid>
        </Paper>
      ))}

      {data.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No skills added yet. Click "Add Skills" to get started.
        </Typography>
      )}
    </Box>
  );
};

export default Skills; 
import { nanoid } from "nanoid";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid as MuiGrid,
  IconButton,
  Paper,
  Slider,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import type { ISkills } from "../../types/cv";

interface SkillsProps {
  data: ISkills[];
  onChange: (data: ISkills[]) => void;
  errors: { [id: string]: Partial<Record<string, string>> };
}

const Skills = ({ data, onChange, errors }: SkillsProps) => {
  const addSkill = () => {
    const newSkill: ISkills = {
      id: nanoid(6),
      name: "",
      proficiency: 0,
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (
    index: number,
    field: keyof ISkills,
    value: string | number
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
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
        <Typography variant="h6">Skills</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addSkill}>
          Add Skill
        </Button>
      </Box>

      {data.map((skill, index) => (
        <Paper
          key={skill.id}
          sx={{ p: 2, mb: 2, position: "relative" }}
          elevation={1}
        >
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => removeSkill(skill.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <MuiGrid container spacing={2}>
            <MuiGrid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`Skill ${index + 1}`}
                value={skill.name}
                onChange={(e) => updateSkill(index, "name", e.target.value)}
                placeholder="Enter a skill"
                error={!!errors[skill.id]?.name}
                helperText={errors[skill.id]?.name}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <Typography gutterBottom>Proficiency</Typography>
              <Slider
                value={skill.proficiency}
                onChange={(_, value) =>
                  updateSkill(index, "proficiency", value as number)
                }
                min={0}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                />
                {errors[skill.id]?.proficiency && (
                  <Typography color="error" variant="body2">
                    {errors[skill.id]?.proficiency}
                  </Typography>
                )}  
            </MuiGrid>
          </MuiGrid>
        </Paper>
      ))}

      {data.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No skills added yet. Click "Add Skill" to get started.
        </Typography>
      )}
    </Box>
  );
};

export default Skills;

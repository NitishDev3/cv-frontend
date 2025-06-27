// import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid as MuiGrid,
  IconButton,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { ISocialProfile } from '../../types/cv';
import { nanoid } from 'nanoid';

interface SocialProfilesProps {
  data: ISocialProfile[];
  onChange: (data: ISocialProfile[]) => void;
  errors: { [id: string]: Partial<Record<string, string>> };
}

const PLATFORMS = [
  'LinkedIn',
  'GitHub',
  'Twitter',
  'Facebook',
  'Instagram',
  'Portfolio',
  'Blog',
  'Other',
];

const SocialProfiles = ({ data, onChange, errors }: SocialProfilesProps) => {
  const addProfile = () => {
    const newProfile: ISocialProfile = {
      id: nanoid(6),
      platform: '',
      url: '',
    };
    onChange([...data, newProfile]);
  };

  const removeProfile = (id: string) => {
    onChange(data.filter((profile) => profile.id !== id));
  };

  const updateProfile = (id: string, field: keyof ISocialProfile, value: string) => {
    onChange(
      data.map((profile) =>
        profile.id === id ? { ...profile, [field]: value } : profile
      )
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Social Profiles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addProfile}
        >
          Add Profile
        </Button>
      </Box>

      {data.map((profile, index) => (
        <Paper
          key={profile.id}
          sx={{ p: 2, mb: 2, position: 'relative' }}
          elevation={1}
        >
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => removeProfile(profile.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" gutterBottom>
            Profile #{index + 1}
          </Typography>

          <MuiGrid container spacing={2}>
            <MuiGrid sx={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={profile.platform}
                  label="Platform"
                  onChange={(e) => updateProfile(profile.id!, 'platform', e.target.value)}
                  error={!!errors[profile.id!]?.platform}
                  // helperText={errors[profile.id!]?.platform} //not working
                >
                  {PLATFORMS.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MuiGrid>
            <MuiGrid sx={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                label="Profile URL"
                value={profile.url}
                onChange={(e) => updateProfile(profile.id!, 'url', e.target.value)}
                placeholder="https://..."
                // helperText="Enter the complete URL to your profile"
                error={!!errors[profile.id!]?.url}
                helperText={errors[profile.id!]?.url}
                />
            </MuiGrid>
          </MuiGrid>
        </Paper>
      ))}

      {data.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No social profiles added yet. Click "Add Profile" to get started.
        </Typography>
      )}
    </Box>
  );
};

export default SocialProfiles; 
import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  Grid as MuiGrid,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import type { IBasicDetailsData } from '../../types/cv';

interface BasicDetailsProps {
  data: IBasicDetailsData;
  onChange: (data: IBasicDetailsData) => void;
}

const BasicDetails = ({ data, onChange }: BasicDetailsProps) => {
  const [imagePreview, setImagePreview] = useState<string>(data.image);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onChange({ ...data, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: keyof IBasicDetailsData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: event.target.value });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Basic Details
      </Typography>

      {/* Image Upload */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={imagePreview}
          alt="Profile"
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<PhotoCameraIcon />}
            >
              Upload Photo
            </Button>
          </label>
        </Box>
      </Box>

      <MuiGrid container spacing={2}>
        {/* Name */}
        <MuiGrid sx={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Full Name"
            value={data.name}
            onChange={handleChange('name')}
          />
        </MuiGrid>

        {/* Designation */}
        <MuiGrid sx={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Designation"
            value={data.designation}
            onChange={handleChange('designation')}
            helperText="Your current job title or role"
          />
        </MuiGrid>

        {/* Contact Information */}
        <MuiGrid sx={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
          />
        </MuiGrid>
        <MuiGrid sx={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={data.phone}
            onChange={handleChange('phone')}
          />
        </MuiGrid>

        {/* City */}
        <MuiGrid sx={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="City"
            value={data.city}
            onChange={handleChange('city')}
          />
        </MuiGrid>
      </MuiGrid>
    </Box>
  );
};

export default BasicDetails; 
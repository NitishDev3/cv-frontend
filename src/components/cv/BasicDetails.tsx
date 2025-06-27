import { useEffect, useState } from 'react';
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
  errors?: Partial<Record<keyof IBasicDetailsData, string>>;
}

const BasicDetails = ({ data, onChange, errors = {} }: BasicDetailsProps) => {
  const [imagePreview, setImagePreview] = useState<string | File>(data.image);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For preview purpose only
      const objectURL = URL.createObjectURL(file);
      setImagePreview(objectURL);

      // Store the actual File object for binary upload
      onChange({ ...data, image: file });
    }
  };

  const handleClearImage = () =>{
    onChange({ ...data, image: "" });
    setImagePreview("");
  }

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
        <Box sx={{display: "flex", gap: "20px"}}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCameraIcon />}
            >
              Upload Photo
            </Button>
          </label>
          <label htmlFor="profile-image-remove">
            <Button
            variant="outlined"
            component="span"
            onClick={handleClearImage}
          >Clear</Button>  
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
            error={!!errors.name}
            helperText={errors.name}
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
            helperText={errors.designation || "Your current job title or role"}
            error={!!errors.designation}
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
            error={!!errors.email}
            helperText={errors.email}
          />
        </MuiGrid>
        <MuiGrid sx={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={data.phone}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
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
            error={!!errors.city}
            helperText={errors.city}
          />
        </MuiGrid>
      </MuiGrid>
    </Box>
  );
};

export default BasicDetails; 
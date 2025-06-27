// Text area input for Professional Summary

import React from 'react';
import { TextField } from '@mui/material';
import type { IProfileSummary } from '../../types/cv';

interface ProfessionalSummaryProps {
  data: IProfileSummary;
  onChange: (data: IProfileSummary) => void;
  errors?: Partial<Record<keyof IProfileSummary, string>>;
}

const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({ data, onChange, errors = {} }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, summary: e.target.value });
  };

  return (
    <TextField
      label="Professional Summary"
      multiline
      minRows={4}
      maxRows={8}
      fullWidth
      value={data.summary}
      onChange={handleChange}
      variant="outlined"
      placeholder="Write a brief summary about your professional background, skills, and goals."
      error={!!errors.summary}
      helperText={errors.summary}
    />
  );
};

export default ProfessionalSummary;
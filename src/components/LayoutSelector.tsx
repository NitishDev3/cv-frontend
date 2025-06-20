import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  Preview as PreviewIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Define the template interface
export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  preview: string;
  category: 'professional' | 'creative' | 'modern';
  features: string[];
}

// Mock templates - Replace with your actual templates
const templates: CVTemplate[] = [
  {
    id: 'professional-1',
    name: 'Professional Classic',
    description: 'A clean and professional layout perfect for corporate roles',
    thumbnail: 'https://marketplace.canva.com/EAGQ-IIGNa0/1/0/1131w/canva-modern-professional-cv-resume-RZAonb9ZjgE.jpg',
    preview: 'https://marketplace.canva.com/EAGQ-IIGNa0/1/0/1131w/canva-modern-professional-cv-resume-RZAonb9ZjgE.jpg',
    category: 'professional',
    features: ['Clean Design', 'Professional Format', 'Easy to Read'],
  },
  {
    id: 'creative-1',
    name: 'Creative Modern',
    description: 'A modern and creative layout for design and creative roles',
    thumbnail: 'https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg',
    preview: 'https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg',
    category: 'creative',
    features: ['Modern Design', 'Visual Appeal', 'Stand Out'],
  },
  {
    id: 'modern-1',
    name: 'Minimal Modern',
    description: 'A minimal and contemporary layout for tech and startup roles',
    thumbnail: 'https://www.jobhero.com/resources/wp-content/uploads/2023/07/tutor-template-resume-JH.svg',
    preview: 'https://www.jobhero.com/resources/wp-content/uploads/2023/07/tutor-template-resume-JH.svg',
    category: 'modern',
    features: ['Minimal Design', 'Contemporary Style', 'Tech-Friendly'],
  },
];

interface LayoutSelectorProps {
  onSelect: () => void;
}

const LayoutSelector = ({ onSelect }: LayoutSelectorProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<CVTemplate | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePreview = (template: CVTemplate) => {
    setPreviewTemplate(template);
  };

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onSelect();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1" color="text.secondary" paragraph>
        Select a template to start creating your professional CV
      </Typography>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                border: selectedTemplate === template.id ? `2px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={template.thumbnail}
                alt={template.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3">
                    {template.name}
                  </Typography>
                  {selectedTemplate === template.id && (
                    <CheckCircleIcon color="primary" />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {template.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {template.features.map((feature, index) => (
                    <Typography
                      key={index}
                      variant="caption"
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip title="Preview Template">
                  <IconButton onClick={() => handlePreview(template)}>
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  variant={selectedTemplate === template.id ? 'contained' : 'outlined'}
                  onClick={() => handleSelect(template.id)}
                >
                  {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Preview Dialog */}
      <Dialog
        open={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {previewTemplate?.name} - Template Preview
        </DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', width: '100%', height: isMobile ? 'auto' : '70vh' }}>
            <img
              src={previewTemplate?.preview}
              alt={previewTemplate?.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewTemplate(null)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (previewTemplate) {
                handleSelect(previewTemplate.id);
                setPreviewTemplate(null);
              }
            }}
          >
            Select This Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LayoutSelector; 
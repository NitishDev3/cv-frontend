import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import LayoutSelector from '../components/LayoutSelector';

const Layouts = () => {
  const navigate = useNavigate();

  const handleLayoutSelect = () => {
    navigate('/createcv');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Choose a CV Template
        </Typography>
        <LayoutSelector onSelect={handleLayoutSelect} />
      </Box>
    </Container>
  );
};

export default Layouts;
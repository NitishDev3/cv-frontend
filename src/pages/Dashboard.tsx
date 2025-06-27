// Dashboard.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  // Share as ShareIcon,
  Payment as PaymentIcon,
  Delete as DeleteIcon,
  CopyAll as CopyIcon,
} from '@mui/icons-material';
import { cvService } from '../api/cvService';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCV, resetCurrentCV, setCurrentCV, setCVs } from '../store/slices/cvSlice';
import type { AppDispatch, RootState } from '../store/index';
import type { ICVData } from '../types/cv';
import { setToast } from '../store/slices/configSlice';
import { genratePDF } from '../utils/jspdfConfig';


const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCV, setSelectedCV] = useState<ICVData | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const cvs = useSelector((store: RootState) => store.cv.cvs);

  const handleDelete = async (cvId: string) => {
    try{
      const response = await cvService.deleteCV(cvId);
      if(response.success){
        dispatch(deleteCV(cvId));
        dispatch(setToast({
          open: true,
          message: 'CV deleted successfully',
          severity: 'success'
        }));
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
      dispatch(setToast({
        open: true,
        message: 'Error deleting CV',
        severity: 'error'
      }));
    }
  };

  const handleDownload = (cvId: string) => {
    setSelectedCV(cvs.find((cv) => cv._id === cvId)!);
    setPaymentDialogOpen(true);
  };

  const handleCopyCV = async (cv: ICVData) => {
    try {
      const response = await cvService.createCV({
        ...cv,
        _id: undefined, // Remove _id to avoid duplication issues
        title: `${cv.title}-copy`,
      });
      if (response.success) {
        console.log('CV copied successfully', response);
        dispatch(setToast({ open: true, message: 'CV copied successfully', severity: 'success' }));
        dispatch(setCVs([...cvs, response.data]));
      }
    } catch (error) {
      console.error('Error copying CV:', error);
      dispatch(setToast({ open: true, message: 'Error copying CV', severity: 'error' }));
    }
  };

  const handlePaymentConfirm = () => {
    // Implement payment processing logic here
    setPaymentDialogOpen(false);
    genratePDF(selectedCV!)
  };

  const handleCreateNew = () => {
    dispatch(resetCurrentCV());
    navigate('/layouts');
  };

  const handleEditCv = (cv: ICVData) => {
    dispatch(setCurrentCV(cv));
    navigate('/createcv');
  };

  useEffect(()=>{
    const fetchCVs = async () => {
      try{
        const response = await cvService.getAllCVs();
        dispatch(setCVs(response));
      } catch (error) {
        console.error('Error fetching CVs:', error);
    };
  }
    fetchCVs();
  },[]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My CVs
        </Typography>
        <Tooltip title="Create New CV">
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleCreateNew}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {cvs.map((cv) => {
          const {_id, title, updatedAt} = cv;
          return (
            <Grid item xs={12} sm={6} md={4} key={_id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last modified: {new Date(updatedAt || '').toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                
                <Tooltip title="Edit">
                  <IconButton onClick={()=>handleEditCv(cv)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(_id!)}>
                    <DeleteIcon  />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download PDF">
                  <IconButton onClick={() => handleDownload(_id!)}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy CV">
                  <IconButton onClick={() => handleCopyCV(cv)}>
                    <CopyIcon />   
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        
          )})}
      </Grid>

      {/* Payment Dialog */}
      <Dialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PaymentIcon color="primary" />
            Payment Required
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            To download your CV, a payment of $5 is required. Would you like to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handlePaymentConfirm}
            startIcon={<PaymentIcon />}
          >
            Proceed to Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
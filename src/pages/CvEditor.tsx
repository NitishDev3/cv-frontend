import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid as MuiGrid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from '@mui/material';
import {
  Save as SaveIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Payment as PaymentIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { RootState } from '../store/index';
import {
  updateBasicDetails,
  updateProfileSummary,
  updateEducation,
  updateExperience,
  updateProjects,
  updateSkills,
  updateSocialProfiles,
  resetCurrentCV,
  updateCVName,
  deleteCV,
} from '../store/slices/cvSlice';

// Import form sections
import BasicDetails from '../components/cv/BasicDetails';
import Education from '../components/cv/Education';
import Experience from '../components/cv/Experience';
import Projects from '../components/cv/Projects';
import Skills from '../components/cv/Skills';
import SocialProfiles from '../components/cv/SocialProfiles';
// import CvPreview from './CvPreview';
// import DynamicCvTemplate from './DynamicCvTemplate';
import { cvService } from '../api/cvService';
import { useNavigate } from 'react-router-dom';
import { setToast } from '../store/slices/configSlice';
import CVTemplate from './CvTemplate';
import ProfessionalSummary from '../components/cv/ProfessionalSummary';
// import useRemoveId from '../hooks/useUpdateCv';
import { jsPDF } from 'jspdf';

const steps = [
  'Basic Details',
  'Professional Summary',
  'Education',
  'Experience',
  'Projects',
  'Skills',
  'Social Profiles',
];

const CvEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cvData = useSelector((state: RootState) => state.cv.currentCV);
  const [activeStep, setActiveStep] = useState(0);

  const [finishButtonText, setFinishButtonText] = useState<'Finish' | 'Next'>('Next');

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [actionType, setActionType] = useState<'download' | 'share' | null>(null);

  const handleNext = async () => {
    try{
    if(finishButtonText === 'Finish'){
      // TODO: save cv data to backend
      // console.log(cvData);
      if(cvData?._id){
        const response = await cvService.updateCV(cvData);
        if(response.success){
          dispatch(setToast({
            open: true,
            message: 'CV updated successfully',
            severity: 'success'
          }));
        }
      } else {
        const response = await cvService.createCV(cvData!);
        if(response.success){
          dispatch(setToast({
            open: true,
            message: 'CV created successfully',
            severity: 'success'
          }));
        }
      }
      return;
      }
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error('Error saving CV:', error);
    }
  };

  const handleBack = () => {
    // TODO: go to previous step
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleSave = async () => {
    try {
      if(cvData?._id){
        //updatedAt created at not allowed while cretaing
        const response = await cvService.updateCV(cvData);
        if (response.success) {
          dispatch(
            setToast({
              open: true,
              message: "CV updated successfully",
              severity: "success",
            })
          );
        }
      } else {
        const response = await cvService.createCV(cvData!);
        if(response.success){
          dispatch(setToast({
            open: true,
            message: 'CV created successfully',
            severity: 'success'
          }));
        }
      }
    } catch (error) {
      console.error('Error saving CV:', error);
      dispatch(setToast({
        open: true,
        message: 'Error saving CV',
        severity: 'error'
      }));
    }
  };

  const handleDeleteCV = async () => {
    try{
      if(cvData?._id){
        const response = await cvService.deleteCV(cvData._id!);
        if(response.success){
          dispatch(resetCurrentCV());
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
      dispatch(setToast({
        open: true,
        message: 'Error deleting CV',
        severity: 'error'
      }));
    }
  }

  const handleDownload = () => {
    setActionType('download');
    setShowPaymentDialog(true);
  };

  const handleShare = () => {
    setActionType('share');
    setShowPaymentDialog(true);
  };

  const handlePaymentConfirm = async () => {
    try {
      setShowPaymentDialog(false);
      if (actionType === 'download') {
        // Generate PDF using jsPDF / TODO: use a better library
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(cvData?.basicDetails?.name || 'CV', 10, 20);
        doc.setFontSize(12);
        doc.text(`Email: ${cvData?.basicDetails?.email || ''}`, 10, 30);
        doc.text(`Phone: ${cvData?.basicDetails?.phone || ''}`, 10, 40);
        doc.text(`City: ${cvData?.basicDetails?.city || ''}`, 10, 50);
        doc.text(`Designation: ${cvData?.basicDetails?.designation || ''}`, 10, 60);
        doc.text('Professional Summary:', 10, 75);
        doc.text(cvData?.profileSummary?.summary || '', 10, 85, { maxWidth: 180 });
        // You can add more fields as needed
        doc.save(`${cvData?.basicDetails?.name || 'cv'}.pdf`);
      } else if (actionType === 'share') {
        // Implement share logic (if needed)
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleDelete = async () => {
    try{
      if(cvData?._id){
        const response = await cvService.deleteCV(cvData._id!);
        if(response.success){
          dispatch(deleteCV(cvData._id!));
          dispatch(setToast({
            open: true,
            message: 'CV deleted successfully',
            severity: 'success'
          }));
        }
        dispatch(resetCurrentCV());
        navigate('/dashboard');
      }
    } catch (error) {
      dispatch(setToast({
        open: true,
        message: 'Error deleting CV',
        severity: 'error'
      }));
    }
  };

  useEffect(()=>{
    if(activeStep === steps.length - 1){
      setFinishButtonText('Finish');
    } else {
      setFinishButtonText('Next');
    }
  },[activeStep])

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BasicDetails
            data={cvData?.basicDetails!}
            onChange={(data) => {
              dispatch(updateBasicDetails(data));
            }}
          />
        );
      case 1:
        return (
          <ProfessionalSummary
            data={cvData?.profileSummary ?? { summary: "" }}
            onChange={(data) => {
              dispatch(updateProfileSummary(data));
            }}
          />
        );
      case 2:
        return (
          <Education
            data={cvData?.education!}
            onChange={(data) => {
              dispatch(updateEducation(data));
            }}
          />
        );
      case 3:
        return (
          <Experience
            data={cvData?.experience!}
            onChange={(data) => {
              dispatch(updateExperience(data));
            }}
          />
        );
      case 4:
        return (
          <Projects
            data={cvData?.projects!}
            onChange={(data) => {
              dispatch(updateProjects(data));
            }}
          />
        );
      case 5:
        return (
          <Skills
            data={cvData?.skills!}
            onChange={(data) => {
              dispatch(updateSkills(data));
            }}
          />
        );
      case 6:
        return (
          <SocialProfiles
            data={cvData?.socialProfiles!}
            onChange={(data) => {
              dispatch(updateSocialProfiles(data));
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with save/download/share buttons */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <MuiGrid container spacing={2} justifyContent="space-between" alignItems="center">
          <MuiGrid sx={{ xs: 12, md: 8 }}>
            <Typography variant="h6">CV Editor</Typography>
          </MuiGrid>
          <MuiGrid>
            {/* input field for cv name */}
            <TextField
              label="CV Name"
              value={cvData?.title}
              onChange={(e) => {
                dispatch(updateCVName(e.target.value));
              }}
              sx={{ width: '100%' }}
            />
          </MuiGrid>

          {/* TODO: position the buttons to the right */}
          <MuiGrid sx={{ xs: 12, md: 4 }}>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleSave}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="outlined"
              onClick={handleDownload}
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <Button
              startIcon={<ShareIcon />}
              variant="outlined"
              onClick={handleShare}
              sx={{ mr: 1 }}
            >
              Share
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              onClick={handleDeleteCV}
            > 
              Delete
            </Button>
          </MuiGrid>
        </MuiGrid>
      </Box>

      {/* Main content area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left side - Form */}
        <Box sx={{ width: '50%', p: 3, overflowY: 'auto' }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel onClick={() => handleStepChange(index)}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Form sections */}
          <Box sx={{ mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          {/* Navigation buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {finishButtonText}
            </Button>
          </Box>
        </Box>

        {/* Right side - Preview */}
        <Box sx={{ width: '50%', p: 3, overflowY: 'auto', bgcolor: 'grey.100' }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {/* <CvPreview /> */}
            {/* {cvData && <DynamicCvTemplate cvData={cvData} />} */}
            { cvData && <CVTemplate cvData={cvData} />}
          </Paper>
        </Box>
      </Box>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)}>
        <DialogTitle>Payment Required</DialogTitle>
        <DialogContent>
          <Typography>
            To {actionType === 'download' ? 'download' : 'share'} your CV, a payment of $10 is required.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            onClick={handlePaymentConfirm}
          >
            Proceed to Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CvEditor;

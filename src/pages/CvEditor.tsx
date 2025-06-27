import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";
import {
  Save as SaveIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Payment as PaymentIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type { RootState } from "../store/index";
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
} from "../store/slices/cvSlice";

// Import form sections
import BasicDetails from "../components/cv/BasicDetails";
import Education from "../components/cv/Education";
import Experience from "../components/cv/Experience";
import Projects from "../components/cv/Projects";
import Skills from "../components/cv/Skills";
import SocialProfiles from "../components/cv/SocialProfiles";
// import CvPreview from './CvPreview';
// import DynamicCvTemplate from './DynamicCvTemplate';
import { cvService } from "../api/cvService";
import { useNavigate } from "react-router-dom";
import { setToast } from "../store/slices/configSlice";
import CVTemplate from "./CvTemplate";
import ProfessionalSummary from "../components/cv/ProfessionalSummary";
// import useRemoveId from '../hooks/useUpdateCv';
import { genratePDF } from "../utils/jspdfConfig";
import { basicDetailsSchema, professionalSummarySchema, educationSchema, experienceSchema, projectsSchema, skillsSchema, socialProfilesSchema } from '../utils/validations/cvFormValidations';
import { handlePayment } from "../api/paymentService";

const steps = [
  "Basic Details",
  "Professional Summary",
  "Education",
  "Experience",
  "Projects",
  "Skills",
  "Social Profiles",
];

const CvEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cvData = useSelector((state: RootState) => state.cv.currentCV);
  const [activeStep, setActiveStep] = useState(0);

  const [finishButtonText, setFinishButtonText] = useState<"Finish" | "Next">(
    "Next"
  );

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [actionType, setActionType] = useState<"download" | "share" | null>(
    null
  );

  const [basicDetailsErrors, setBasicDetailsErrors] = useState<Partial<Record<string, string>>>({});
  const [profileSummaryErrors, setProfileSummaryErrors] = useState<Partial<Record<string, string>>>({});
  const [educationErrors, setEducationErrors] = useState<{ [id: string]: Partial<Record<string, string>> }>({});
  const [experienceErrors, setExperienceErrors] = useState<{ [id: string]: Partial<Record<string, string>> }>({});
  const [projectsErrors, setProjectsErrors] = useState<{ [id: string]: Partial<Record<string, string>> }>({});
  const [skillsErrors, setSkillsErrors] = useState<{ [id: string]: Partial<Record<string, string>> }>({});
  const [socialProfilesErrors, setSocialProfilesErrors] = useState<{ [id: string]: Partial<Record<string, string>> }>({});

  const validateBasicDetails = () => {
    const result = basicDetailsSchema.safeParse(cvData?.basicDetails);
    if (!result.success) {
      const errors: Partial<Record<string, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setBasicDetailsErrors(errors);
      return false;
    }
    setBasicDetailsErrors({});
    return true;
  };

  const validateProfileSummary = () => {
    const result = professionalSummarySchema.safeParse(cvData?.profileSummary);
    if (!result.success) {
      const errors: Partial<Record<string, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setProfileSummaryErrors(errors);
      return false;
    }
    setProfileSummaryErrors({});
    return true;
  };

  const validateEducation = () => {
    const errors: { [id: string]: Partial<Record<string, string>> } = {};
    let isValid = true;
    (cvData?.education || []).forEach(entry => {
      const result = educationSchema.safeParse(entry);
      if (!result.success) {
        isValid = false;
        errors[entry.id!] = {};
        result.error.errors.forEach(err => {
          if (err.path[0]) errors[entry.id!][err.path[0]] = err.message;
        });
      }
    });
    setEducationErrors(errors);
    console.log(errors);
    return isValid;
  };

  const validateExperience = () => {
    const errors: { [id: string]: Partial<Record<string, string>> } = {};
    let isValid = true;
    (cvData?.experience || []).forEach(entry => {
      const result = experienceSchema.safeParse(entry);
      if (!result.success) {
        isValid = false;
        errors[entry.id!] = {};
        result.error.errors.forEach(err => {
          if (err.path[0]) errors[entry.id!][err.path[0]] = err.message;
        });
      }
    });
    setExperienceErrors(errors);
    return isValid;
  };

  const validateProjects = () => {
    const errors: { [id: string]: Partial<Record<string, string>> } = {};
    let isValid = true;
    (cvData?.projects || []).forEach(entry => {
      // Convert nulls to empty string for validation
      const toValidate = {
        ...entry,
        name: entry.name ?? "",
        description: entry.description ?? "",
        startDate: entry.startDate ?? "",
        endDate: entry.endDate ?? "",
        url: entry.url ?? "",
      };
      const result = projectsSchema.safeParse(toValidate);
      if (!result.success) {
        isValid = false;
        errors[entry.id!] = {};
        result.error.errors.forEach(err => {
          if (err.path[0]) errors[entry.id!][err.path[0]] = err.message;
        });
      }
    });
    setProjectsErrors(errors);
    // console.log(errors);
    return isValid;
  };

  const validateSkills = () => {
    const result = skillsSchema.safeParse(cvData?.skills || []);
    const errors: { [id: string]: Partial<Record<string, string>> } = {};
    let isValid = true;

    if (!result.success) {
      isValid = false;
      result.error.errors.forEach(err => {
        if (err.path.length === 2) {
          // err.path[0] = index, err.path[1] = field
          const index = err.path[0] as number;
          const field = err.path[1] as string;
          const skill = (cvData?.skills || [])[index];
          if (skill && skill.id) {
            if (!errors[skill.id]) errors[skill.id] = {};
            errors[skill.id][field] = err.message;
          }
        }
      });
    }
    setSkillsErrors(errors);
    return isValid;
  };

  const validateSocialProfiles = () => {
    const errors: { [id: string]: Partial<Record<string, string>> } = {};
    let isValid = true;
    (cvData?.socialProfiles || []).forEach(entry => {
      const result = socialProfilesSchema.safeParse(entry);
      if (!result.success) {
        isValid = false;
        errors[entry.id!] = {};
        result.error.errors.forEach(err => {
          if (err.path[0]) errors[entry.id!][err.path[0]] = err.message;
        });
      }
    });
    setSocialProfilesErrors(errors);
    return isValid;
  };

const handleNext = async () => {
    if (activeStep === 0 && !validateBasicDetails()) return;
    if (activeStep === 1 && !validateProfileSummary()) return;
    if (activeStep === 2 && !validateEducation()) return;
    if (activeStep === 3 && !validateExperience()) return;
    if (activeStep === 4 && !validateProjects()) return;
    if (activeStep === 5 && !validateSkills()) return;
    if (activeStep === 6 && !validateSocialProfiles()) return;
    try {
      if (finishButtonText === "Finish") {
        // TODO: save cv data to backend
        // console.log(cvData);
        if (cvData?._id) {
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
          if (response.success) {
            dispatch(
              setToast({
                open: true,
                message: "CV created successfully",
                severity: "success",
              })
            );
          }
        }
        return;
      }
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("Error saving CV:", error);
    }
  };

  const handleBack = () => {
    // TODO: go to previous step
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepChange = (step: number) => {
    if (activeStep === 0 && !validateBasicDetails()) return;
    if (activeStep === 1 && !validateProfileSummary()) return;
    if (activeStep === 2 && !validateEducation()) return;
    if (activeStep === 3 && !validateExperience()) return;
    if (activeStep === 4 && !validateProjects()) return;
    if (activeStep === 5 && !validateSkills()) return;
    if (activeStep === 6 && !validateSocialProfiles()) return;
    setActiveStep(step);
  };

  const handleSave = async () => {
    try {
      if (cvData?._id) {
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
        if (response.success) {
          dispatch(
            setToast({
              open: true,
              message: "CV created successfully",
              severity: "success",
            })
          );
        }
      }
    } catch (error) {
      console.error("Error saving CV:", error);
      dispatch(
        setToast({
          open: true,
          message: "Error saving CV",
          severity: "error",
        })
      );
    }
  };

  const handleDeleteCV = async () => {
    try {
      if (cvData?._id) {
        const response = await cvService.deleteCV(cvData._id!);
        if (response.success) {
          dispatch(resetCurrentCV());
          navigate("/dashboard");
          dispatch(
            setToast({
              open: true,
              message: "CV deleted successfully",
              severity: "success",
            })
          );
        }
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
      dispatch(
        setToast({
          open: true,
          message: "Error deleting CV",
          severity: "error",
        })
      );
    }
  };

  const handleDownload = () => {
    setActionType("download");
    setShowPaymentDialog(true);
  };

  const handleShare = () => {
    setActionType("share");
    setShowPaymentDialog(true);
  };

  const handlePaymentConfirm = async () => {
    try {
      setShowPaymentDialog(false);
      if (actionType === "download") {
        // Generate PDF using jsPDF
        await handlePayment(cvData?._id!)
        dispatch(setToast(
          {open: true,
          message: "Payment Successful",
          severity: "success"}
        ))

        // genratePDF(cvData!);
      } else if (actionType === "share") {
        // Implement share logic (if needed)
      }
    } catch (error) {
      dispatch(
        setToast({
          open: true,
          message: "Error processing payment",
          severity: "error",
        })
      )
    }
  };

  useEffect(() => {
    if (activeStep === steps.length - 1) {
      setFinishButtonText("Finish");
    } else {
      setFinishButtonText("Next");
    }
  }, [activeStep]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BasicDetails
            data={cvData?.basicDetails!}
            onChange={(data) => {
              dispatch(updateBasicDetails(data));
            }}
            errors={basicDetailsErrors}
          />
        );
      case 1:
        return (
          <ProfessionalSummary
            data={cvData?.profileSummary ?? { summary: "" }}
            onChange={(data) => {
              dispatch(updateProfileSummary(data));
            }}
            errors={profileSummaryErrors}
          />
        );
      case 2:
        return (
          <Education
            data={cvData?.education!}
            onChange={(data) => {
              dispatch(updateEducation(data));
            }}
            errors={educationErrors}
          />
        );
      case 3:
        return (
          <Experience
            data={cvData?.experience!}
            onChange={(data) => {
              dispatch(updateExperience(data));
            }}
            errors={experienceErrors}
          />
        );
      case 4:
        return (
          <Projects
            data={cvData?.projects!}
            onChange={(data) => {
              dispatch(updateProjects(data));
            }}
            errors={projectsErrors}
          />
        );
      case 5:
        return (
          <Skills
            data={cvData?.skills!}
            onChange={(data) => {
              dispatch(updateSkills(data));
            }}
            errors={skillsErrors}
          />
        );
      case 6:
        return (
          <SocialProfiles
            data={cvData?.socialProfiles!}
            onChange={(data) => {
              dispatch(updateSocialProfiles(data));
            }}
            errors={socialProfilesErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header with save/download/share buttons */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <MuiGrid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
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
              sx={{ width: "100%" }}
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
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left side - Form */}
        <Box sx={{ width: "50%", p: 3, overflowY: "auto" }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel onClick={() => handleStepChange(index)}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Form sections */}
          <Box sx={{ mb: 4 }}>{renderStepContent(activeStep)}</Box>

          {/* Navigation buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {finishButtonText}
            </Button>
          </Box>
        </Box>

        {/* Right side - Preview */}
        <Box
          sx={{ width: "50%", p: 3, overflowY: "auto", bgcolor: "grey.100" }}
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            {/* <CvPreview /> */}
            {/* {cvData && <DynamicCvTemplate cvData={cvData} />} */}
            {cvData && <CVTemplate cvData={cvData} />}
          </Paper>
        </Box>
      </Box>

      {/* Payment Dialog */}
      <Dialog
        open={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
      >
        <DialogTitle>Payment Required</DialogTitle>
        <DialogContent>
          <Typography>
            To {actionType === "download" ? "download" : "share"} your CV, a
            payment of $10 is required.
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

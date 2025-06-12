import CvFormComp from "./CvFormComp";
import StepperComp from "./Stepper";
import { useState } from "react";

const steps = ["Basic Details", "Professional Summary", "Skills", "Experience", "Education", "Achievements"];

const CvEditor = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  return (
    <>
      <StepperComp steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
      <CvFormComp activeStep={activeStep} formData={formData} setFormData={setFormData} />
    </>
  );
};

export default CvEditor;

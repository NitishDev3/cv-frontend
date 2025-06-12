import { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

type TProps = {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepperComp = ({ steps, activeStep, setActiveStep }: TProps) => {
  const [] = useState<number>(0);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            onClick={() => setActiveStep(index)}
          >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default StepperComp;
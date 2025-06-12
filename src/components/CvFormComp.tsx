import { Box, TextField } from "@mui/material";
import { CV_EDIT_FIELDS } from "../utils/cvEditFields"; 
import type{ TField } from "../utils/types";

type TProps = {
  activeStep: number;
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const CvFormComp: React.FC<TProps> = ({ activeStep, formData, setFormData }) => {
  const currentStep = CV_EDIT_FIELDS[activeStep];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      {currentStep?.fields?.map((field: TField) => (
        <TextField
          key={field.id}
          required={field.required}
          id={field.id}
          label={field.label}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          type={field.type || "text"}
          variant={field.variant || "standard"}
          inputProps={
            field.type === "number"
              ? {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  sx: {
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                    MozAppearance: "textfield",
                  },
                }
              : undefined
          }
        />
      ))}
    </Box>
  );
};

export default CvFormComp;

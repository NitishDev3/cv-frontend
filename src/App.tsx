import { useState } from "react";
import { Grid } from "@mui/material";
import CvEditor from "./components/CvEditor";
import LiveResumePreview from "./components/LiveResumePreview";

export type TFormData = {
  fullName: string;
  city: string;
  email: string;
  mobile: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    start: string;
    end: string;
    current: boolean;
    description: string;
  }[];
  education: {
    institution: string;
    major: string;
    year: string;
    cgpa: string;
  }[];
  achievements: string;
};

function App() {
  const [formData, setFormData] = useState<TFormData>({
    fullName: "",
    city: "",
    email: "",
    mobile: "",
    linkedin: "",
    github: "",
    summary: "",
    skills: [],
    experience: [],
    education: [],
    achievements: "",
  });

  return (
    <Grid container spacing={2} p={2}>
        <CvEditor />
    </Grid>
  );
}

export default App;

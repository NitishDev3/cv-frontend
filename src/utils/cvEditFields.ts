import type { TCvEditFields } from "./types";

export const CV_EDIT_FIELDS: TCvEditFields[] = [
  {
    name: "Basic Details",
    fields: [
      { id: "fullName", label: "Full Name", name: "fullName", required: true, variant: "standard" },
      { id: "city", label: "City", name: "city", required: true, variant: "standard" },
      { id: "email", label: "Email ID", name: "email", required: true, variant: "standard", type: "email" },
      {
        id: "mobile",
        label: "Mobile No.",
        name: "mobile",
        required: true,
        type: "number",
        variant: "standard"
      },
      { id: "linkedin", label: "LinkedIn Link", name: "linkedin", required: true, variant: "standard" },
      { id: "github", label: "GitHub Link", name: "github", required: true, variant: "standard" },
    ],
  },
  {
    name: "Professional Summary",
    fields: [
      {
        id: "summary",
        label: "Summary",
        name: "summary",
        required: true,
        variant: "standard",
        type: "text",
      },
    ],
  },
  {
    name: "Skills",
    fields: [
      {
        id: "skills",
        label: "Skills (comma separated)",
        name: "skills",
        required: true,
        variant: "standard",
        type: "text",
      },
    ],
  },
  {
    name: "Experience",
    fields: [
      {
        id: "company",
        label: "Company Name",
        name: "company",
        required: true,
        variant: "standard",
      },
      {
        id: "role",
        label: "Role",
        name: "role",
        required: true,
        variant: "standard",
      },
      {
        id: "duration",
        label: "Duration (e.g. Jan 2022 - Present)",
        name: "duration",
        required: true,
        variant: "standard",
      },
      {
        id: "description",
        label: "Work Description",
        name: "description",
        required: true,
        variant: "standard",
        type: "text",
      },
    ],
  },
  {
    name: "Education",
    fields: [
      {
        id: "institute",
        label: "Institute Name",
        name: "institute",
        required: true,
        variant: "standard",
      },
      {
        id: "degree",
        label: "Degree",
        name: "degree",
        required: true,
        variant: "standard",
      },
      {
        id: "eduDuration",
        label: "Duration (e.g. 2019 - 2023)",
        name: "eduDuration",
        required: true,
        variant: "standard",
      },
    ],
  },
  {
    name: "Achievements",
    fields: [
      {
        id: "achievements",
        label: "Achievements (comma separated)",
        name: "achievements",
        required: false,
        variant: "standard",
        type: "text",
      },
    ],
  },
];

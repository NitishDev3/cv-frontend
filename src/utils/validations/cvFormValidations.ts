import { z } from "zod";

export const basicDetailsSchema = z.object({
  name: z.string().min(1, "Full Name is required").regex(/^[a-zA-Z\s]+$/, "Name should not contain numbers"),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be of 10 digits")
    .max(10, "Phone must be of 10 digits")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone number"),
  city: z.string().min(1, "City is required"),
  image: z.string().optional(),
});

export const professionalSummarySchema = z.object({
  summary: z.string().min(100, "Summary must be at least 100 characters"),
});

export const experienceSchema = z
  .object({
    title: z.string().min(1, "Job Title is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().min(1, "Location is required"),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().optional(),
    current: z.boolean(),
    roleDescription: z
      .array(z.string().min(1, "Description can't be empty"))
      .min(3, "At least 3 role descriptions are required"),
  })
  .refine(
    (data) => {
      // If not current, then endDate is required and must be after startDate
      if (!data.current) {
        if (!data.endDate) return false;

        const start = new Date(data.startDate);
        const end = new Date(data.endDate);

        return start < end;
      }
      // If current, no need to validate endDate
      return true;
    },
    {
      message: "End Date must be after Start Date (or mark as Current)",
      path: ["endDate"],
    }
  );


export const educationSchema = z
  .object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
    grade: z.string().optional(),
    field: z.string().min(1, "Field is required"),
  })
  .refine( // check the condition for end date to be after start date
    (data) => {
      if (!data.endDate) return true;
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "End Date must be after Start Date",
      path: ["endDate"],
    }
  );

  
export const skillsSchema = z.array(
  z.object({
    name: z.string().min(1, "Skill is required"),
    proficiency: z.number().min(1, "Proficiency is required"),
  })
).min(1, "At least one skill is required");

export const projectsSchema = z
  .object({
    name: z.string().min(1, "Project Name is required"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
    technologies: z.array(z.string()).min(1, "Technologies are required"),
    url: z.string().min(1, "Link is required"),
  })
  .refine(
    ({ startDate, endDate }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return start < end;
    },
    {
      message: "End Date must be after Start Date",
      path: ["endDate"], // attach the error to endDate field
    }
  );


export const socialProfilesSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().min(1, "URL is required"),
});

export type BasicDetailsSchemaType = z.infer<typeof basicDetailsSchema>;
export type ProfessionalSummarySchemaType = z.infer<typeof professionalSummarySchema>;
export type ExperienceSchemaType = z.infer<typeof experienceSchema>;
export type EducationSchemaType = z.infer<typeof educationSchema>;
export type SkillsSchemaType = z.infer<typeof skillsSchema>;
export type ProjectsSchemaType = z.infer<typeof projectsSchema>;
export type SocialProfilesSchemaType = z.infer<typeof socialProfilesSchema>;

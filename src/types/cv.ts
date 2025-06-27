//basic details
export interface IBasicDetailsData {
  image: string | File;
  name: string;
  email: string;
  phone: string;
  city: string;
  designation: string;
}

//profile summary
export interface IProfileSummary {
  summary: string
}

//education
export interface IEducationEntry {
  id?: string;
  _id?: string;
  degree: string;
  field: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade: string;
}

//experience
export interface IExperienceEntry {
  id?: string;
  _id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  roleDescription: string[];
}

//projects
export interface IProjectEntry {
  id?: string;
  _id?: string;
  name: string;
  description: string | null;
  technologies: string[];
  startDate: string | null;
  endDate: string | null;
  url: string | null;
}

//skills
export interface ISkills {
  id: string;
  _id?: string;
  name: string;
  proficiency: number;
}

//social profiles
export interface ISocialProfile {
  id?: string;
  _id?: string;
  platform: string;
  url: string;
}

//cv data
export interface ICVData {
  _id?: string;
  title: string;
  basicDetails: IBasicDetailsData;
  profileSummary: IProfileSummary;
  education: IEducationEntry[];
  experience: IExperienceEntry[];
  projects: IProjectEntry[];
  skills: ISkills[];
  socialProfiles: ISocialProfile[];
  updatedAt?: string;
  createdAt?: string;
} 


//cv state
export interface ICvInitialState {
  cvs: ICVData[];
  currentCV: ICVData | null;
}



//CV Preview
export interface ICvPreviewProps {
  cvData: ICVData;
}

//Dynamic CV Template
export interface ITemplateStyleProps {
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  headingVariant?: "h4" | "h5" | "h6";
  bodyVariant?: "body1" | "body2";

  // Layout/positioning overrides
  layout?: {
    headerDirection?: "row" | "column";
    avatarPosition?: "left" | "right" | "top";
    sectionSpacing?: number;
    showDivider?: boolean;
  };
}

//Dynamic CV Template
export interface IDynamicCVProps extends ICvPreviewProps {
  styleProps?: ITemplateStyleProps;
}
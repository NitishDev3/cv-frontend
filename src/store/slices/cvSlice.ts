import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICVData, ICvInitialState } from '../../types/cv';

const initialCVData: ICVData = {
  title: '',
  basicDetails: {
    image: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    designation: '',
  },
  profileSummary: {
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  socialProfiles: [],
  updatedAt: '',
  createdAt: '',
};

const initialState : ICvInitialState = {
  cvs: [],
  currentCV: initialCVData,
}

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setCVs: (state, action: PayloadAction<ICVData[]>) => {
      state.cvs = action.payload;
    },
    setCurrentCV: (state, action: PayloadAction<ICVData>) => {
      state.currentCV = action.payload;
    },
    resetCurrentCV: (state) => {
      state.currentCV = initialCVData;
    },
    deleteCV: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter(cv => cv._id !== action.payload);
    },
    updateBasicDetails: (state, action: PayloadAction<ICVData['basicDetails']>) => {
      state.currentCV!.basicDetails = action.payload;
    },
    updateProfileSummary: (state, action: PayloadAction<ICVData['profileSummary']>) => {
      state.currentCV!.profileSummary = action.payload;
    },
    updateEducation: (state, action: PayloadAction<ICVData['education']>) => {
      state.currentCV!.education = action.payload;
    },
    updateExperience: (state, action: PayloadAction<ICVData['experience']>) => {
      state.currentCV!.experience = action.payload;
    },
    updateProjects: (state, action: PayloadAction<ICVData['projects']>) => {
      state.currentCV!.projects = action.payload;
    },
    updateSkills: (state, action: PayloadAction<ICVData['skills']>) => {
      state.currentCV!.skills = action.payload;
    },
    updateSocialProfiles: (state, action: PayloadAction<ICVData['socialProfiles']>) => {
      state.currentCV!.socialProfiles = action.payload;
    },
    updateCVName: (state, action: PayloadAction<string>) => {
      state.currentCV!.title = action.payload;
    },
  },
});

export const {
  setCVs,
  setCurrentCV,
  resetCurrentCV,
  deleteCV,
  updateBasicDetails,
  updateProfileSummary,
  updateEducation,
  updateExperience,
  updateProjects,
  updateSkills,
  updateSocialProfiles,
  updateCVName,
} = cvSlice.actions;

export default cvSlice.reducer; 
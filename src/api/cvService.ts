import axios from 'axios';
import { API_URL } from '../utils/apiConstants';
import { type ICVData } from '../types/cv';

export const cvService = {
  async createCV(cvData: ICVData) {
    const response = await axios.post(`${API_URL}/cv/create`, cvData, {
        withCredentials: true,
    });
    return response.data;
  },

  async updateCV(cvData: ICVData) {
    const response = await axios.put(`${API_URL}/cv/update/${cvData._id}`, cvData, {
        withCredentials: true,
    });
    return response.data;
  },

  async getAllCVs() {
    const response = await axios.get(`${API_URL}/cv/get-all`, {
        withCredentials: true,
    });
    return response.data;
  },

  async getCV(id: string) {
    const response = await axios.get(`${API_URL}/cv/get/${id}`, {
        withCredentials: true,
    });
    return response.data;
  },

  async deleteCV(id: string) {
    const response = await axios.delete(`${API_URL}/cv/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
  }
};

import axios from 'axios';
import type { LoginFormData, RegisterFormData } from '../utils/validations/authValidations';

const API_URL = "http://localhost:5000/api";

export const authService = {

  async getUser() {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      withCredentials: true,
    });
    return response.data.user;
  },

  async login(data: LoginFormData) {
    const response = await axios.post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    });
    return response;  
  },

  async register(data: RegisterFormData) {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  async loginWithGoogle() {
    await axios.get(`${API_URL}/auth/google`);
    // console.log(response.data.user);
    return;
  },

  async loginWithFacebook() {
    const response = await axios.get(`${API_URL}/auth/facebook`);
    return response.data.user;
  },

  async logout() {
    const response = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  },
}; 
import axios from "axios";

const API_BASE_URL = "http://localhost:5004/users"; 

const AuthService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data.accessToken;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUser: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default AuthService;

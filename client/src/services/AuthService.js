import axios from "axios";

const API_GATEWAY_URL = "http://localhost:3001";
const API_BASE_URL = `${API_GATEWAY_URL}/users`;

const setAuthorizationHeader = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error("Invalid token");
  }
  // Set the token in the Authorization header for future requests
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const AuthService = {
  isAuthenticated: () => {
    // Check if the user is authenticated based on your criteria
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    return !!accessToken && !!userId;
  },
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Error in register:", error);
      throw error.response.data;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      const { accessToken, userId } = response.data;
  
      // Use the function to set the token in the header
      setAuthorizationHeader(accessToken);
  
      // Optionally, you can also store the token and userId in localStorage for persistence
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
  
      return { accessToken, userId };
    } catch (error) {
      console.error("Error in login:", error);
      throw error.response.data;
    }
  },
  
  getUser: async (userId) => {
    try {
      // Check if the user is authenticated before making the request
      if (!AuthService.isAuthenticated()) {
        throw new Error("User not authenticated");
      }

      console.log("User id", userId);
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      // Handle the case where the user is not authenticated
      if (error.message === "User not authenticated") {
        console.warn("User not authenticated");
        // You might want to redirect the user to the login page or handle it in some other way
      } else {
        throw error.response.data;
      }
    }
  },
  
  logout: () => {
    // Clear the stored token and user ID
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    // Remove the Authorization header
    delete axios.defaults.headers.common["Authorization"];
  },
  setUserToken: (token) => {
    try {
      // Utiliser la fonction pour définir le token dans l'en-tête
      setAuthorizationHeader(token);

      // Optionally, you can also store the token in localStorage for persistence
      localStorage.setItem("accessToken", token);

      console.log("User token set successfully:", token);
    } catch (error) {
      console.error("Error setting user token:", error.message);
    }
  },
  
};

export default AuthService;

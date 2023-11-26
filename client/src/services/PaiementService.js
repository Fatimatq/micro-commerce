import axios from 'axios';

const API_GATEWAY_URL = "http://localhost:3001";
const API_BASE_URL = `${API_GATEWAY_URL}/Payments`;

const PaiementService = {
  makePayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, paymentData);
      return response.data;
    } catch (error) {
      throw new Error(`Error making payment: ${error.message}`);
    }
  },
};

export default PaiementService;

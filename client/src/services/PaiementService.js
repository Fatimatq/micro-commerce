import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/payments'; 

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
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/Orders'; 

const OrderService = {
  placeOrder: async (productId, orderDate, quantity, orderPay ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, {
        productId,
        orderDate,
        quantity,
        orderPay,
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error placing order: ${error.message}`);
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting order: ${error.message}`);
    }
  },

  updateOrder: async (orderId, { productId, orderDate, quantity, orderPay }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${orderId}`, {
        productId,
        orderDate,
        quantity,
        orderPay,
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error updating order: ${error.message}`);
    }
  },
};

export default OrderService;

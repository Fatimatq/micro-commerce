import axios from 'axios';

const API_GATEWAY_URL = "http://localhost:3001";
const API_BASE_URL = `${API_GATEWAY_URL}/Products`;

const ProductService = {
  getProduct: async (productId) => {
  try {
    console.log('URL de la requête getProduct :', `${API_BASE_URL}/${productId}`);
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Product not found
      return null; 
    }

    console.error('Erreur lors de la récupération du produit :', error);
    throw error;
  }
},
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      throw new Error('Une erreur s\'est produite lors de la récupération des produits.');
    }
  },
};

export default ProductService;

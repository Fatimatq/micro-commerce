import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/Products'; 

const ProductService = {
  getProduct: async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Product not found
      return null; // or throw a custom error, or handle it in a different way
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

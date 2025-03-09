import axios from "axios";

const API_URL = "http://localhost:8000/api";

// 🔄 Helper function for Authorization Headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 🟢 USER AUTHENTICATION
export const loginUser = async (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerUser = async (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const getProfile = async () =>
  axios.get(`${API_URL}/auth/profile`, { headers: getAuthHeaders() });

// 🛒 PRODUCT MANAGEMENT
export const getProducts = async () =>
  axios.get(`${API_URL}/products`, { headers: getAuthHeaders() });

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Adding Product:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ UPDATED DELETE FUNCTION WITH ERROR HANDLING
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error Deleting Product:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ ADDED UPDATE PRODUCT FUNCTION
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Updating Product:", error.response?.data || error.message);
    throw error;
  }
};

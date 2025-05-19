import axios from "axios";

const API_BASE = "https://api.paybridge.store/storefront";

export async function fetchProducts() {
  try {
    const response = await axios.get(`${API_BASE}/products`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

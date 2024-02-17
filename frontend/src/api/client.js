import axios from "axios";

export class ApiClient {
  constructor(baseURL = "http://localhost:5000/api") {
    this.api = axios.create({
      baseURL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  // CRUD methods

  async get(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async post(endpoint, data, headers = {}) {
    try {
      const response = await this.api.post(endpoint, data, headers);
      return response;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }
  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }
}

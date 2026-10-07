import axios from "axios";

const http = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const getCampers = async (params) => {
  try {
    const { data } = await http.get("/campers", { params });
    return Array.isArray(data) ? data : (data?.items ?? []);
  } catch (error) {
    // The backend answers 404 when nothing matches the filters
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const getCamperById = async (id) => {
  const { data } = await http.get(`/campers/${id}`);
  return data;
};

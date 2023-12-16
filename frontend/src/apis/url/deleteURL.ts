import api from "..";

export const deleteURL = async (id: number) => {
  try {
    const endpoint = `/api/scraping/detail/${id}/`;
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    return error;
  }
};

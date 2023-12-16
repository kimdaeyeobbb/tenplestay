
import axios, { AxiosError } from 'axios';
import api from '.';

export const fetchAllScrapingUrl = async (page: number = 1) => {
  try {
    const endpoint = `/api/scraping/?page=${page}`;
    const response = await api.get(endpoint,
      // 운영계 강제 테스팅을 위한 임시 코드임
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMzA5ODMzLCJpYXQiOjE3MDI3MDUwMzMsImp0aSI6ImJhNDRjNzNjYjAxYTQ0MjM5MTBiOTE4NWU3NGQxMDllIiwidXNlcl9pZCI6Mn0.cP1GPsRgaimS8m0OuhKZaU8F43E6MpYOWGWbyOIa2-8",
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러인 경우, HTTP 상태 코드 확인
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        // 상태 코드가 401인 경우, 응답을 반환
        return axiosError.response;
      }
    }
    // 그 외의 경우, 에러를 던짐
    throw error;
  }
};


export const fetchAScrapingUrl = async (id: string) => {
  try {
    const endpoint = `/api/scraping/detail/${id}/`;
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러인 경우, HTTP 상태 코드 확인
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        // 상태 코드가 401인 경우, 응답을 반환
        return axiosError.response;
      }
    }
    // 그 외의 경우, 에러를 던짐
    throw error;
  }
};

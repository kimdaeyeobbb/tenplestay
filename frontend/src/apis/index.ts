/* 인터셉터 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiURL = import.meta.env.VITE_API_URL; // 데이터를 요청할 기본주소

const instance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

/* 요청 인터셉터 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config: 만들어놓은 axios 객체의 기본설정을 가져옴
    // 이 config를 return 해주어야 네트워크 요청을 보낼 수 있음 (return 안해주면 요청의 설정값이 날아가므로 요청이 보내지지 않음)
    console.log('axios > index.ts의 요청사항: ', config);
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러났을시 error을 인자로 받아서 요청을 거절
  },
);

instance.interceptors.response.use(
  (response) => {
    console.log('axios > index.ts에서의 response: ', response);
    return response;
  },
  (error) => {
    console.log('에러가 발생했습니다 :', error);
    return Promise.reject(error);
  },
);

export default instance;

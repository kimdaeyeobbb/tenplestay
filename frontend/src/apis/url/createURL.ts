import instance from '../../apis/index';

export const createURL = async (url: string) => {
  try {
    const response = await instance.post('실제 API 엔드포인트', { url });
    console.log('URL 등록시 response 확인: ', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

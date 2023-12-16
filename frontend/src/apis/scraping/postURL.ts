import api from '..';

export const postURL = async (url: string) => {
  try {
    const endpoint = '/api/scraping/request';

    const response = await api.post(
      endpoint,
      { url }, // 객체 형태로 전달
    );

    // console.log('postURL에서의 response: ', response);
    return response;
  } catch (error) {
    throw error;
  }
};

import api from '..';

export const postURLinfo = async (data: object) => {
  try {
    const endpoint = '/api/scraping/';
    const response = await api.post(endpoint, data);
    console.log('등록한 URL에 대한 전체 정보 입력 후 resposne: ', response);

    return response;
  } catch (error) {
    throw error;
  }
};

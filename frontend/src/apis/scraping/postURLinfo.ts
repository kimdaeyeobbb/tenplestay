import api from '..';

export const postURLinfo = async (data: {
  inputURL: string;
  willPassKeywords: string[];
  mainNoti: number | null;
  subNoti: number | null;
  cellphone: string | null;
}) => {
  const processedData = {
    website: data.inputURL,
    keywords: data.willPassKeywords.join(','),
    main_noti_platform: data.mainNoti,
    sub_noti_platform: data.subNoti,
    phone_number: data.cellphone,
  };

  try {
    const endpoint = '/api/scraping/';
    const response = await api.post(endpoint, processedData);
    console.log('등록한 URL에 대한 전체 정보 입력 후 resposne: ', response);

    return response;
  } catch (error) {
    throw error;
  }
};

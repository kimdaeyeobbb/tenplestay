import instance from '../index';

export const postURL = async (url: string) => {
  try {
    const endpoint = '/api/scraping/request';

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMjQ3MTc0LCJpYXQiOjE3MDI2NDIzNzQsImp0aSI6ImZkYmJiOGYxMmY4ZjRkNzE5Y2RmYmQyZDc0Yjg4NzkyIiwidXNlcl9pZCI6Mn0.Vvttowc5VZDygMbdN1mSxvHLvRmwDuZspUaCY-UqlEA';

    const response = await instance.post(
      endpoint,
      { url }, // 객체 형태로 전달
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('postURL에서의 response: ', response);
    return response;
  } catch (error) {
    throw error;
  }
};

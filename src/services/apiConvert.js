import axios from 'axios';
const URLApiConvert = process.env.REACT_APP_CONVERT_API_URL;
const TokenApiConvert = process.env.REACT_APP_CONVERT_API_KEY;

export async function convertWordToPdf(base64String) {
  try {
    const response = await axios.post(
      `${URLApiConvert}/convert/docx/to/pdf`,
      {
        Parameters: [
          {
            Name: 'File',
            FileValue: {
              Name: 'documentPdf.docx',
              Data: base64String,
            },
          },
          {
            Name: 'StoreFile',
            Value: true,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${TokenApiConvert}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

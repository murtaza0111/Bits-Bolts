import axios from "axios";

export const getApiData = async (url, method, headers, data) => {
  try {
    let response;
    if (data !== undefined && headers !== undefined) {
      response = await axios({
        url,
        method,
        headers,
        body: data,
      });
    } else if (data === undefined && headers !== undefined) {
      response = await axios({
        headers: headers,
      });
    } else if (data === undefined && headers === undefined) {
      response = await axios({ url, method, data });
    }
    return response.status === 200 ? await response.data : false;
  } catch (error) {
    console.error("Check internet connection!!!");
  }
};

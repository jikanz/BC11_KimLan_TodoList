import { API_URL } from "./../config/consstant.js";
export default class WorkService {
  callApi(uri, method, data) {
    return axios({
      url: API_URL + "/" + uri,
      method,
      data,
    });
  }
}

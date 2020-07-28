import axios from "axios";

import { API_URL } from "../config";

export const request = (opts = {}, optsHeader = {}) => {
  const defaultOptions = {
    ...opts,
    headers: optsHeader,
  };

  const axiosApi = axios.create({
    baseURL: API_URL,
    ...defaultOptions,
  });

  // axiosApi.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
  return axiosApi;
};

export default request;

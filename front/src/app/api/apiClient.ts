// axios apiclient
import axios from "axios";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const session = await getSession();
    if (session) {
      config.headers.email = session?.user?.email;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;

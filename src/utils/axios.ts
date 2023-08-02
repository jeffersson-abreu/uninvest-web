import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from '../config';
import { getErrorMessageFromResponse } from './errors';

// ----------------------------------------------------------------------

export enum Tokens {
  refreshToken = 'refreshToken', 
  accessToken = 'accessToken', 
}

export const getAPIInstance = () => {
  const apiInstance =  axios.create({
    baseURL: HOST_API,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  apiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${localStorage.getItem(Tokens.accessToken)}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  apiInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
      if (error.response.status === 401) {
        try {
          const originalRequest = error.config;
          originalRequest._retry = true;
  
          const refreshApi = axios.create({
            baseURL: HOST_API,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem(Tokens.refreshToken)}`,
              'Content-Type': 'application/json'
            }
          })
  
          const response = await refreshApi.get('/api/auth/refresh', {});
          const { accessToken, refreshToken } = response.data;
  
          localStorage.setItem(Tokens.refreshToken, refreshToken);
          localStorage.setItem(Tokens.accessToken, accessToken);
  
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return await axios(originalRequest)
  
        } catch (error: any) {
          localStorage.removeItem(Tokens.refreshToken);
          localStorage.removeItem(Tokens.accessToken);
          return Promise.reject(new Error('Sessão expirada'));
        }
      }
  
      return getErrorMessageFromResponse(error)
    }
  );

  return apiInstance;
}

export const getAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: HOST_API,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => getErrorMessageFromResponse(error)
  );

  return axiosInstance
}

export default axios.create({
  baseURL: 'localhost',
  headers: {
    'Content-Type': 'application/json'
  }
})
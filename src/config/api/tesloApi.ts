import {STAGE, API_URL as PROD_API, API_URL_ANDROID, API_URL_IOS} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../adapters/storage-adapter';

export const API_URL =
  STAGE === 'prod'
    ? PROD_API
    : Platform.OS === 'android'
    ? API_URL_ANDROID
    : API_URL_IOS;

const testloApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

testloApi.interceptors.request.use(
  async config => {
    const token = await StorageAdapter.getItem('token');
    if (token) {
      // eslint-disable-next-line dot-notation
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export {testloApi};

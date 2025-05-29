import {STAGE, API_URL as PROD_API, API_URL_ANDROID, API_URL_IOS} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';

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

//todo interceptors

export {testloApi};

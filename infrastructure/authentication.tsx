/* eslint-disable no-unused-vars */
import axios from 'axios';
import { IJSEncryptOptions } from 'jsencrypt/lib/JSEncrypt';
import { capitalize, getPublicKey } from './utils';

export const setAuthTokenHeader = (token: string) => {
  axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
}

export const setAxiosInterceptor = (showToast: (severity: 'success' | 'info' | 'warn' | 'error', title: string, detail: string) => void) => {
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    showToast(
      'error', 
      capitalize(error?.response?.data?.description || 'Something went wrong'), 
      error?.response?.data?.error || "Unexpected error"
    );
    
    return Promise.reject(error);
  });
}

export const onEncrypt = async (data: string) => {
  const encryptKey = await getPublicKey();
  const JSEncrypt = (await import('jsencrypt')).default 
  const options: IJSEncryptOptions = { 
    default_key_size: "4096", 
    default_public_exponent: "010001", 
    log: false 
  } 
  let encrypt = new JSEncrypt(options); 
  encrypt.setPublicKey(encryptKey); 
  return encrypt.encrypt(data);
}
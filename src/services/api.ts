import axios, { AxiosError, AxiosResponse } from 'axios';

let _token: string | null = null;
export type ApiResponse = AxiosResponse<any> & {
  ok: boolean;
  data?: any;
  extraData?: object;
};

export const setToken = (token: string | null) => (_token = token);
const transformRequest = (config: any) => {
  const _config = { ...config };
  console.log({ _token });
  if (_token) {
    _config.headers.Authorization = `Bearer ${_token}`;
  }
  return _config;
};

const transformResponse = (response: AxiosResponse): ApiResponse => {
  const { status, data, config, headers, statusText } = response;

  return {
    ok: status === 200 && data && data?.code === 200,
    data: (data && data.data) || null,
    extraData: (data && data.attr) || null,
    config: config,
    headers: headers,
    status: 0,
    statusText: statusText,
  };
};

const transformError = (error: AxiosError) => {
  return Promise.reject(error);
};

const serialize = (params: any, parentKey: any = null): string => {
  let result = '';
  for (let key in params) {
    if (params[key] !== null || params[key] !== undefined) {
      if (typeof params[key] === 'object') {
        result += serialize(params[key], key);
      } else {
        if (parentKey) {
          result += `${parentKey || key}[]=${params[key]}&`;
        } else {
          result += `${parentKey || key}=${params[key]}&`;
        }
      }
    }
  }

  return parentKey ? result : `?${result}`;
};
const create = () => {
  const headers = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  };

  const _api = axios.create({
    // baseURL: 'https://api.docosan.com/api',
    // baseURL: 'https://develop.docosan.com/test/api',
    baseURL: 'https://develop.docosan.com/thanh/api',
    headers,
    timeout: 120000, // 2minutes
  });
  _api.interceptors.request.use(transformRequest);
  _api.interceptors.response.use(transformResponse, transformError);

  const login = (payload: {
    phone_code: string;
    phone_number: string;
    code: string;
    language: string;
  }) => _api.post('verify-otp', payload);
  const requestOTP = (payload: {
    language: 'vi' | 'en';
    phone_code: string;
    phone_number: string;
  }) => _api.post('register-otp', payload);

  const logout = (payload: any) => _api.post(`logout${serialize(payload)}`);

  const getEnvironment = () => _api.get<ApiResponse>('diseases');
  const sendMessage = (payload: any) =>
    _api.post<ApiResponse>('patients/chat-gpt', payload);

  return {
    login,
    requestOTP,
    logout,
    getEnvironment,
    sendMessage,
  };
};

export default { create };

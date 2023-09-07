import axios, { AxiosError, AxiosResponse } from 'axios';

export type ApiResponse = AxiosResponse<any> & {
  ok: boolean;
  data?: any;
  extraData?: object;
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
    baseURL: 'https://api.docosan.com/api',
    headers,
    timeout: 20000, // 20s
  });
  // _api.interceptors.request.use(transformRequest);
  _api.interceptors.response.use(transformResponse, transformError);

  const login = (payload: any) => _api.post('login', payload);

  const logout = (payload: any) => _api.post(`logout${serialize(payload)}`);

  /* environment */
  const getEnvironment = () => _api.get<ApiResponse>('diseases');
  /* end environment */

  return {
    login,
    logout,
    getEnvironment,
  };
};

export default { create };

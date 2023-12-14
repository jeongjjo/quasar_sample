import { boot } from 'quasar/wrappers';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}
export interface HttpResponse<T = unknown> {
	data: T;
	code: string;
	status: string;
	message?: string;
}

const TIMEOUT = 30000;

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' });

const api: AxiosInstance = Axios.create({
	baseURL: import.meta.env.BASE_URL + '/api',
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
	timeout: TIMEOUT,
});
api.interceptors.response.use(
	(res: AxiosResponse<HttpResponse>) => {
		if (res.data) {
			return res;
		}
		errorStatus(res);
		return Promise.reject(res);
	},
	async (error) => {
		const response = error.response;
		errorStatus(response);
		return Promise.reject(response);
	}
);
api.interceptors.request.use((req: any) => {
	req.headers = authHeader(req);
	return req;
});
const authHeader = (req: AxiosRequestConfig) => {
	const token = null;
	if (token) {
		req.headers!.Authorization = token;
	}
	return req.headers;
};
const errorStatus = (response: AxiosResponse) => {
	switch (response?.status) {
		case 400:
			break;
		case 401:
			break;
		case 403:
			break;
		case 404:
			break;
		case 405:
			break;
		case 406:
			break;
		case 408:
			break;
		case 409:
			break;
		case 500:
			break;
		case 501:
			break;
		case 502:
			break;
		case 504:
			break;
		default: {
		}
	}
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = Axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

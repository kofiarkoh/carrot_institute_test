import axios from "axios";
import {reduxStore} from "../store/store";

const BASE_URL = "http://192.168.8.108:8000/api";

export const errorHandler = (error: any) => {
	if (error.response) {
		return {
			is_error: true,
			msg: error.response.data,
			code: error.response.status,
		};
	} else if (error.request) {
		return {
			is_error: true,
			msg: error.request._timedOut
				? "Connection timed out, Please check your internet connection"
				: "There was an error connecting to server.", // error.request
			code: 500,
		};
	} else {
		// Something happened in setting up the request that triggered an Error
		return {
			is_error: true,
			msg: error.message,
			code: 500,
		};
	}
};

export const POST = async (
	endpoint: string,
	data: any,
	headers = {},
	timeout = 1800000
) => {
	let token = "9|VOa7JS18zVOO6FOEPriWcSl2mkvamKF92hYpbelv"; // reduxStore.getState().loginState.token;
	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	_headers = {..._headers, ...headers};

	return await axios
		.post(`${BASE_URL}/${endpoint}`, data, {
			headers: _headers,
			timeout: timeout,
			timeoutErrorMessage: "Connection Timed out",
		})
		.then((res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};
export const PUT = async (
	endpoint: string,
	data: any,
	headers = {},
	timeout = 1800000
) => {
	let token = "9|VOa7JS18zVOO6FOEPriWcSl2mkvamKF92hYpbelv"; // reduxStore.getState().loginState.token;
	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	_headers = {..._headers, ...headers};

	return await axios
		.put(`${BASE_URL}/${endpoint}`, data, {
			headers: _headers,
			timeout: timeout,
			timeoutErrorMessage: "Connection Timed out",
		})
		.then((res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};

export const GET = async (endpoint: string, headers = {}) => {
	let token = "9|VOa7JS18zVOO6FOEPriWcSl2mkvamKF92hYpbelv"; // reduxStore.getState().loginState.token;

	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};
	_headers = {..._headers, ...headers};
	return await axios
		.get(`${BASE_URL}/${endpoint}`, {
			headers: _headers,
			timeoutErrorMessage: "Connection Timed out",
		})
		.then(async (res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};
export const DELETE = async (endpoint: string, headers = {}) => {
	let token = "9|VOa7JS18zVOO6FOEPriWcSl2mkvamKF92hYpbelv"; // reduxStore.getState().loginState.token;

	let _headers = {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};
	let url = `${BASE_URL}/${endpoint}`;
	console.log(url);
	return await axios
		.delete(url, {
			headers: _headers,

			timeoutErrorMessage: "Connection Timed out",
		})
		.then((res) => {
			return {
				is_error: false,
				msg: res.data,
				code: 200,
			};
		})
		.catch((error) => {
			return errorHandler(error);
		});
};

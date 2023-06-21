import axios from "axios";

const BASE_URL = "http://192.168.8.108:8000";

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
	let token = "";
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

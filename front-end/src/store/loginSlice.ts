import {createSlice} from "@reduxjs/toolkit";

export interface User {
	name: string;
	email: string;
}
const initialState: {user: User; token: string} = {
	user: {
		name: "",
		email: "",
	},
	token: "",
};
export const loginSlice = createSlice({
	name: "loginSlice",
	initialState: initialState,
	reducers: {
		setUserInfo: (state, {payload}) => {
			state.user = payload;
		},
		setToken: (state, {payload}) => {
			state.token = payload;
		},
	},
});

export const {setUserInfo, setToken} = loginSlice.actions;

export default loginSlice.reducer;

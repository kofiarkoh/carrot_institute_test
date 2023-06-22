import React from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../store/store";
import {useRouter} from "next/navigation";
import AppBar from "@mui/material/AppBar";
import {setToken, setUserInfo} from "../store/loginSlice";

export default function CustomAppBar() {
	const {user} = useAppSelector((state) => state.loginState);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const logout = () => {
		dispatch(setToken(""));
		dispatch(setUserInfo({name: "", email: ""}));
		sessionStorage.clear();
		router.push("/auth/login");
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						CTI
					</Typography>
					<Button color="inherit">Logout</Button>
				</Toolbar>
			</AppBar>
		</>
	);
}

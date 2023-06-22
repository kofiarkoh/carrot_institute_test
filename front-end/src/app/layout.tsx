"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";
import {Inter} from "next/font/google";

import Container from "@mui/material/Container";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Provider} from "react-redux";
import {reduxStore, useAppDispatch, useAppSelector} from "../store/store";
import AppSnackbar from "../components/AppSnackbar";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User, setToken, setUserInfo} from "../store/loginSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
	const [isloadingToken, setLoadingToken] = useState(false);

	useEffect(() => {
		setLoadingToken(true);
	}, []);

	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider store={reduxStore}>
					<ThemeProvider theme={createTheme()}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Container
								maxWidth={false}
								disableGutters
								sx={{
									height: "100vh",

									margin: [0, "auto"],
									width: ["100%", "100%", "100%", "100%", "1000px"],
									backgroundColor: "white",
								}}>
								<RenderDashboardLayout>{children}</RenderDashboardLayout>
								<AppSnackbar />
							</Container>
						</LocalizationProvider>
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}

const RenderDashboardLayout = ({children}: {children: React.ReactNode}) => {
	const [isloadingToken, setLoadingToken] = useState(true);

	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		setLoadingToken(true);
		console.log("ready");
		let _userInfo: string | null = sessionStorage.getItem("user_info");
		let token: string | null = sessionStorage.getItem("bearer_token");

		if (!_userInfo || !token) {
			setLoadingToken(false);
			router.push("/auth/login");
		} else {
			setLoadingToken(false);
			let userInfo: User = JSON.parse(_userInfo);
			dispatch(setToken(JSON.parse(token)));
			dispatch(setUserInfo(userInfo));
		}
	}, []);

	if (isloadingToken) {
		return <></>;
	}

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
			{children}
		</>
	);
};

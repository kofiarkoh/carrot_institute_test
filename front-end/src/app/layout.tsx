"use client";

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
import {useEffect} from "react";
import {User, setToken, setUserInfo} from "../store/loginSlice";
const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
	const RenderDashboardLayout = () => {
		const {user} = useAppSelector((state) => state.loginState);
		const dispatch = useAppDispatch();
		const router = useRouter();

		useEffect(() => {
			let _userInfo: string | null = sessionStorage.getItem("user_info");
			let token: string | null = sessionStorage.getItem("bearer_token");
			if (!_userInfo || !token) {
				router.push("/auth/login");
			} else {
				let userInfo: User = JSON.parse(_userInfo);
				dispatch(setToken(JSON.parse(token)));
				dispatch(setUserInfo(userInfo));
			}
		}, []);

		return <>{children}</>;
	};
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

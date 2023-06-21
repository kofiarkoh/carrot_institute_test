"use client";

import "./globals.css";
import {Inter} from "next/font/google";

import Container from "@mui/material/Container";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Provider} from "react-redux";
import {reduxStore} from "../store/store";
import AppSnackbar from "../components/AppSnackbar";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
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
								{children}
								<AppSnackbar />
							</Container>
						</LocalizationProvider>
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}

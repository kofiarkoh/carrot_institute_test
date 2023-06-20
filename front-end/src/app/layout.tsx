"use client";

import "./globals.css";
import {Inter} from "next/font/google";

import Container from "@mui/material/Container";
import {ThemeProvider, createTheme} from "@mui/material/styles";
const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider theme={createTheme()}>
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
					</Container>
				</ThemeProvider>
			</body>
		</html>
	);
}

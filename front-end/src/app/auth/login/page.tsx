"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik} from "formik";
import Link from "next/link";
import * as Yup from "yup";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";

const valdiationSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().required(),
});
export default function LoginPage() {
	return (
		<div
			css={css`
				background-color: rgb(243, 245, 249);
				height: 97vh;
				width: 100%;
				padding: 0;
				margin: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			`}>
			<Formik
				initialValues={{email: "", password: ""}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={(d, h) => {}}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						Welcome Back
					</Typography>

					<FormTextField placeholder="Email" name="email" />
					<FormPasswordInput
						name="password"
						placeholder="Password"
						sx={{width: "100%", marginTop: 4}}
					/>

					<div
						css={css`
							display: flex;
							justify-content: flex-end;
						`}></div>
					<SubmitButton loading={false} sx={{width: "100%", my: 3}}>
						Log In
					</SubmitButton>
					<div
						css={css`
							display: flex;
							justify-content: center;
							align-items: center;
						`}>
						<Typography>Don&apos;t have an account?</Typography>
						<Link href="#" style={{textDecoration: "none"}}>
							<Typography pl={2}> Sign Up</Typography>
						</Link>
					</div>
				</Card>
			</Formik>
		</div>
	);
}

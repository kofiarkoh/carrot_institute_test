"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import Link from "next/link";
import * as Yup from "yup";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {POST} from "@/api/base";
import {useState} from "react";
import {useAppDispatch} from "@/store/store";
import {setToken, setUserInfo} from "@/store/loginSlice";
import {useRouter} from "next/navigation";
import {showSnackBar} from "../../../store/snackbarSlice";

const valdiationSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().required(),
});
export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	/**
	 * call login api with the validated data .
	 * it saves the user info and token in sesssion storage and redux store
	 * once login is successful and navigates to show all task page.
	 * should login fail, appropriate errors will be shown on the form using formik helpers.
	 * @param data
	 * @param helpers
	 * @returns
	 */
	const handleLogin = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}
		setLoading(true);
		let response = await POST("auth/login", data);
		setLoading(false);
		if (response.is_error) {
			if (response.code === 422) {
				helpers.setErrors(response.msg.errors);
			}
			dispatch(
				showSnackBar({
					message: response.msg.message ? response.msg.message : "An error occured",
					severity: response.is_error ? "error" : "success",
				})
			);
			return;
		}
		dispatch(
			showSnackBar({
				message: response.msg.message,
				severity: "success",
			})
		);
		sessionStorage.setItem("user_info", JSON.stringify(response.msg.data));
		sessionStorage.setItem("bearer_token", JSON.stringify(response.msg.token));
		dispatch(setUserInfo(response.msg.data));
		dispatch(setToken(response.msg.token));
		router.push("/tasks/index");
	};

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
				onSubmit={handleLogin}>
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
					<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
						Log In
					</SubmitButton>
					<div
						css={css`
							display: flex;
							justify-content: center;
							align-items: center;
						`}>
						<Typography>Don&apos;t have an account?</Typography>
						<Link href="/auth/register" style={{textDecoration: "none"}}>
							<Typography pl={2}> Sign Up</Typography>
						</Link>
					</div>
				</Card>
			</Formik>
		</div>
	);
}

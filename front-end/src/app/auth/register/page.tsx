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
import {POST} from "../../../api/base";
import {useState} from "react";
import {useAppDispatch} from "../../../store/store";
import {setToken, setUserInfo} from "../../../store/loginSlice";
import {showSnackBar} from "@/store/snackbarSlice";
import {useRouter} from "next/navigation";
const valdiationSchema = Yup.object().shape({
	name: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().min(5).max(15).required(),
	password_confirmation: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords do not match")
		.required(),
});

export default function RegistrationPage() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	/**
	 * call register api with the validated data .
	 * it saves the user info and token in sesssion storage and redux store
	 * once registration is successful and navigates to show all task page.
	 * should registration fail, appropriate errors will be shown on the form using formik helpers.
	 * @param data
	 * @param helpers
	 * @returns
	 */
	const handleRegister = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let response = await POST("auth/register", data);
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
				initialValues={{
					name: "",
					email: "",
					password: "",
					password_confirmation: "",
				}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={handleRegister}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						SIGN UP
					</Typography>

					<FormTextField placeholder="Name" name="name" />
					<FormTextField placeholder="Email" name="email" sx={{mt: 4}} />

					<FormPasswordInput
						name="password"
						placeholder="Password"
						sx={{width: "100%", marginTop: 4}}
					/>
					<FormPasswordInput
						name="password_confirmation"
						placeholder="Confirm Password"
						sx={{width: "100%", marginTop: 4}}
					/>

					<div
						css={css`
							display: flex;
							justify-content: flex-end;
						`}></div>
					<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
						Register
					</SubmitButton>
					<div
						css={css`
							display: flex;
							justify-content: center;
							align-items: center;
						`}>
						<Typography>Already have an account?</Typography>
						<Link href="/auth/login" style={{textDecoration: "none"}}>
							<Typography pl={2}>Login</Typography>
						</Link>
					</div>
				</Card>
			</Formik>
		</div>
	);
}

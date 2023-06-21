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
	name: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().required(),
	password_confirmation: Yup.string().required(),
});
export default function AddTaskDetails() {
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
				onSubmit={(d, h) => {}}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						Task Details
					</Typography>

					<FormTextField
						placeholder="Title"
						name="title"
						sx={{width: "100%", marginTop: 4}}
					/>

					<FormTextField
						placeholder="Description"
						name="description"
						sx={{width: "100%", marginTop: 4}}
						multiline
					/>

					<div
						css={css`
							display: flex;
							justify-content: flex-end;
						`}></div>
					<SubmitButton loading={false} sx={{width: "100%", my: 3}}>
						Save Task
					</SubmitButton>
				</Card>
			</Formik>
		</div>
	);
}

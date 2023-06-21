"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import FormDatePicker from "../../../components/forms/FormDatePicker";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {POST} from "@/api/base";
import {useState} from "react";
import {useAppDispatch} from "@/store/store";
import {setToken, setUserInfo} from "@/store/loginSlice";
import {useRouter} from "next/navigation";
import {addTask} from "../../../store/tasksSlice";

const valdiationSchema = Yup.object().shape({
	title: Yup.string().required(),
	description: Yup.string().required(),
	due_at: Yup.string().required(),
});
export default function AddTaskDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const createTask = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		setLoading(true);
		let response = await POST("tasks", data);
		setLoading(false);

		if (response.is_error) {
			if (response.code === 422) {
				helpers.setErrors(response.msg.errors);
				return;
			}
			console.log(response.msg.message);
			return;
		}

		dispatch(addTask(response.msg.data));
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
					title: "",
					description: "",
					due_at: "",
				}}
				validationSchema={valdiationSchema}
				validateOnBlur={false}
				validateOnMount={false}
				validateOnChange={false}
				onSubmit={createTask}>
				<Card sx={{padding: 5, margin: {xs: 4}}}>
					<Typography variant="h4" my={3} sx={{textAlign: "center"}}>
						Task Details
					</Typography>

					<FormTextField
						label="Title"
						placeholder="Title"
						name="title"
						sx={{width: "100%", marginTop: 4}}
					/>

					<FormTextField
						label="Description"
						placeholder="Description"
						name="description"
						sx={{width: "100%", marginTop: 4}}
						multiline
					/>

					<FormDatePicker name="due_at" label="Due Date" />

					<div
						css={css`
							display: flex;
							justify-content: flex-end;
						`}></div>
					<SubmitButton loading={loading} sx={{width: "100%", my: 3}}>
						Save Task
					</SubmitButton>
				</Card>
			</Formik>
		</div>
	);
}

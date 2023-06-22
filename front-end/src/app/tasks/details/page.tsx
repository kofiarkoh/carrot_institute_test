"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik, FormikHelpers, FormikProps, FormikValues} from "formik";
import * as Yup from "yup";
import FormDatePicker from "../../../components/forms/FormDatePicker";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import {POST, PUT} from "@/api/base";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setToken, setUserInfo} from "@/store/loginSlice";
import {useRouter} from "next/navigation";
import {addTask, setCurrentTask} from "../../../store/tasksSlice";
import {showSnackBar} from "@/store/snackbarSlice";

const valdiationSchema = Yup.object().shape({
	title: Yup.string().required(),
	description: Yup.string().required(),
	due_at: Yup.string().required(),
});
export default function AddTaskDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const formikRef = useRef<FormikProps<FormikValues>>(null);
	const {currentTask} = useAppSelector((state) => state.tasksState);

	/**
	 * calls the create new tasks endpoint if currentTask in redux state is empty,
	 * else , it calls the update task enpoint
	 * @param data
	 * @param helpers
	 * @returns
	 */
	const createTask = async (data: any, helpers: FormikHelpers<any>) => {
		if (loading) {
			return;
		}

		let isUpdate = currentTask.uuid ? true : false;
		setLoading(true);
		let response = isUpdate
			? await PUT(`tasks/${currentTask.uuid}`, data)
			: await POST("tasks", data);
		setLoading(false);

		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
		if (response.is_error) {
			if (response.code === 422) {
				helpers.setErrors(response.msg.errors);
				return;
			}
			return;
		}

		if (isUpdate) {
			/*
				reset the currenTask so that if the user comes back to this 
				page through the create task button, a create new task request will be made 
			 */
			dispatch(
				setCurrentTask({
					title: "",
					description: "",
					due_at: "",
					uuid: "",
					status: "",
				})
			);
			router.push("/tasks/index");
		}

		// update the tasks and go back to showw all tasks created
		dispatch(addTask(response.msg.data));
		router.push("/tasks/index");
	};
	useEffect(() => {
		formikRef.current?.setValues(currentTask);
	}, [currentTask]);
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
				innerRef={(t) => {
					formikRef.current = t;
				}}
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

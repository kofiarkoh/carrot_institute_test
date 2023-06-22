"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import TaskItem from "../../../components/TaskItem";
import {FormikHelpers} from "formik";
import {GET, POST} from "@/api/base";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setToken, setUserInfo} from "@/store/loginSlice";
import {useRouter} from "next/navigation";
import {updateTasks} from "../../../store/tasksSlice";
import {showSnackBar} from "@/store/snackbarSlice";
import {Button, Typography} from "@mui/material";

export default function AddTaskDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.loginState);
	const {tasks} = useAppSelector((state) => state.tasksState);
	const router = useRouter();

	const fetchTasks = async () => {
		if (loading) {
			return;
		}
		setLoading(true);
		let response = await GET("tasks");

		setLoading(false);
		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
		if (response.is_error) {
			return;
		}
		dispatch(updateTasks(response.msg.data));
	};

	const createTask = () => {
		router.push("/tasks/details");
	};
	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div
			css={css`
				background-color: rgb(243, 245, 249);
				height: 97vh;
				width: 100%;
				padding: 0;
				margin: 0;
				display: flex;
				flex-direction: column;

				align-items: flex-start;
			`}>
			<Grid container spacing={4} sx={{padding: "20px"}}>
				<Grid item sm={12} md={12} lg={12}>
					<div
						style={{
							paddingTop: "10px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",

							width: "100%",
						}}>
						<div>
							<Typography variant="h6">Welcome, {user.name.split(" ")[0]}</Typography>
							<Typography variant="body1">Here are your tasks</Typography>
						</div>
						<div>
							<Button variant="contained" onClick={createTask}>
								Create Task
							</Button>
						</div>
					</div>
				</Grid>
				{tasks.map((task) => {
					return (
						<Grid key={task.uuid} item sm={12} md={6} lg={4}>
							<TaskItem
								due_at={new Date(task.due_at).toDateString()}
								title={task.title}
								description={task.description}
								uuid={task.uuid}
								status={task.status}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}

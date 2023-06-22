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

export default function AddTaskDetails() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	const {tasks} = useAppSelector((state) => state.tasksState);

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
				justify-content: center;
				align-items: flex-start;
			`}>
			<Grid container spacing={4} sx={{padding: "20px"}}>
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

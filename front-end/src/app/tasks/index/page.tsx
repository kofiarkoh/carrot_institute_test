"use client";
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Formik} from "formik";
import * as Yup from "yup";
import FormDatePicker from "../../../components/forms/FormDatePicker";
import FormTextField from "../../../components/forms/FormTextField";
import SubmitButton from "../../../components/forms/SubmitButton";
import TaskItem from "../../../components/TaskItem";
import Grid from "@mui/material/Grid";

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
				align-items: flex-start;
			`}>
			<Grid container spacing={4} sx={{padding: "20px"}}>
				<Grid item sm={12} md={6} lg={4}>
					<TaskItem
						due_at="	 11/06 / 2016"
						title="Every day is a fresh start, a chance to "
						description="The sun sets, casting a golden glow upon the tranquil horizon. The gentle
							breeze whispers through the trees, carrying the promise of a new day. In
							"
					/>
				</Grid>
				<Grid item sm={12} md={6} lg={4}>
					<TaskItem
						due_at="	 11/06 / 2016"
						title="Every day is a fresh start, t."
						description="The sun sets, casting a golden glow upon the tranquil horizon. The gentle
						 a reminder to cherish the present and embrace life's
						simple joys"
					/>
				</Grid>
				<Grid item sm={12} md={6} lg={4}>
					<TaskItem
						due_at="	 11/06 / 2016"
						title="Every day is a fresh start, a chance to create, explore, and find beauty
						in."
						description="The sun sets, casting a golden glow upon the tranquil horizon. The gentle
						breeze whispers through the trees, carrying the promise of a new day. In
						this moment, all worries fade away, a"
					/>
				</Grid>
			</Grid>

			{/* <TaskItem
				due_at="	 11/06 / 2016"
				title="Every day is a fresh start, t."
				description="The sun sets, casting a golden glow upon the tranquil horizon. The gentle
						breeze whispers thro\illed with serenity.
						Nature's beauty is a reminder to cherish the present and embrace life's
						simple joys"
			/>
			<TaskItem
				due_at="	 11/06 / 2016"
				title="Every day is a fresh start, a chance to create, explore, and find beauty
						in."
				description="The sun sets, casting a golden glow upon the tranquil horizon. The gentle
						breeze whispers through the trees, carrying the promise of a new day. In
						this moment, all worries fade away, a"
			/> */}
		</div>
	);
}

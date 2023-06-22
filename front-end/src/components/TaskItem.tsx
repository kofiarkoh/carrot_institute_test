import React, {useState} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {DELETE, POST} from "../api/base";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch} from "../store/store";
import {removeTask, setCurrentTask} from "../store/tasksSlice";
import {useRouter} from "next/navigation";
import {showSnackBar} from "../store/snackbarSlice";
import Skeleton from "@mui/material/Skeleton";

type Props = {
	title: string;
	description: string;
	due_at: string;
	uuid: string;
};
export default function TaskItem(props: Props) {
	const {title, description, due_at, uuid} = props;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeTaskStatusMenu = () => {
		setAnchorEl(null);
	};

	const updateTaskStatus = async (status: string) => {
		setAnchorEl(null);
		if (loading) {
			return;
		}
		setLoading(true);
		let formData = new FormData();
		formData.append("_method", "PUT");
		formData.append("status", status);
		let response = await POST(`tasks/${uuid}/status`, formData, {
			"Content-Type": "application'/form-data",
		});
		setLoading(false);
		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
	};

	const deleteTask = async () => {
		setAnchorEl(null);
		if (loading) {
			return;
		}
		setLoading(true);

		let response = await DELETE(`tasks/${uuid}`);
		setLoading(false);
		if (response.is_error) {
			return;
		}
		dispatch(
			showSnackBar({
				message: response.msg.message ? response.msg.message : "An error occured",
				severity: response.is_error ? "error" : "success",
			})
		);
		dispatch(removeTask(uuid));
	};

	const editTask = () => {
		dispatch(setCurrentTask(props));
		console.log(props);
		router.push("/tasks/details");
	};
	return (
		<Box sx={{width: "100%"}}>
			<Card
				variant="outlined"
				sx={{
					width: "100%",
					sheight: "400px",
					display: "flex",
					flexDirection: "column",
				}}>
				{loading && <LinearProgress />}
				<CardContent>
					<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
						Due on {due_at}
					</Typography>
					<Typography variant="h5" component="div" sx={{my: 2}}>
						{title}
					</Typography>

					<Typography variant="body2">{description}</Typography>
				</CardContent>
				<CardActions sx={{flexDirection: "row", justifyContent: "flex-end"}}>
					<div>
						<Button
							id="status-button"
							aria-controls={open ? "status-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							size="small"
							onClick={handleClick}>
							Mark As
						</Button>
						<Menu
							id="status-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={closeTaskStatusMenu}
							MenuListProps={{
								"aria-labelledby": "status-button",
							}}>
							<MenuItem onClick={() => updateTaskStatus("pending")}>Pending</MenuItem>
							<MenuItem onClick={() => updateTaskStatus("completed")}>
								Completed
							</MenuItem>
						</Menu>
					</div>
					<Button size="small" color="error" onClick={deleteTask}>
						Delete
					</Button>
					<Button size="small" onClick={editTask}>
						Edit
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
export function TaskItemSkeleton() {
	return (
		<Box sx={{width: "100%"}}>
			<Card
				variant="outlined"
				sx={{
					width: "100%",
					sheight: "400px",
					display: "flex",
					flexDirection: "column",
				}}>
				<LinearProgress />
				<CardContent>
					<Skeleton animation="wave" width="100px" />

					<Skeleton animation="wave" width="150px" />

					<Skeleton animation="wave" width="170px" sx={{mt: "40px"}} />
					<Skeleton animation="wave" width="240px" />
					<Skeleton animation="wave" width="240px" />
					<Skeleton animation="wave" width="190px" />
				</CardContent>
				<CardActions sx={{flexDirection: "row", justifyContent: "flex-end"}}>
					<div>
						<Skeleton animation="wave" width="50px" sx={{marginRight: "10px"}} />
					</div>
					<Skeleton animation="wave" width="50px" />
					<Skeleton animation="wave" width="50px" />
				</CardActions>
			</Card>
		</Box>
	);
}

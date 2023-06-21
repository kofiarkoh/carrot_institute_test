import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
type Props = {
	title: string;
	description: string;
	due_at: string;
};
export default function TaskItem(props: Props) {
	const {title, description, due_at} = props;
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
				<CardContent>
					<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
						Due on {due_at}
					</Typography>
					<Typography variant="h5" component="div" sx={{my: 2}}>
						{title}
					</Typography>

					<Typography variant="body2">{description}</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		</Box>
	);
}

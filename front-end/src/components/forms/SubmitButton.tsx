import LoadingButton, {LoadingButtonProps} from "@mui/lab/LoadingButton";
import {useFormikContext} from "formik";

export default function SubmitButton(props: LoadingButtonProps) {
	const {submitForm} = useFormikContext();
	return (
		<LoadingButton
			variant="contained"
			disableElevation
			{...props}
			sx={{
				transition: "background 1s, color 1s",
				color: "white",
				backgroundColor: "primary.main",
				width: "60%",
				height: "50px",
				borderRadius: "15px",
				textTransform: "capitalize",
				borderColor: "transparent",
				"&:hover": {
					backgroundColor: "black",
				},
				...props.sx,
			}}
			onClick={submitForm}>
			{props.children}
		</LoadingButton>
	);
}

import React from "react";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useField} from "formik";
import {Typography} from "@mui/material";

type FormikInputProps = {
	name: string;
	label: string;
};
type FormDateFieldProps = FormikInputProps;

export default function FormDatePicker(props: FormDateFieldProps) {
	const {name, label} = props;
	const [field, meta, helpers] = useField(name);

	const handleChange = (value: any) => {
		let date = `${value.$D}-${value.$M + 1}-${value.$y}`;
		helpers.setValue(date);
	};

	return (
		<>
			<DatePicker
				sx={{
					width: "100%",
					mt: 4,
					borderRadius: "15px",
				}}
				label={label}
				onChange={handleChange}
			/>
			{meta.error && (
				<Typography sx={{color: "red", pl: 2, fontSize: 12}}>
					{meta.error}
				</Typography>
			)}
		</>
	);
}

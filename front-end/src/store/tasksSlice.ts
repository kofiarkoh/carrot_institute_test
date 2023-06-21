import {createSlice} from "@reduxjs/toolkit";

export interface Task {
	title: string;
	description: string;
	due_at: string;
	uuid: string;
}
const initialState: {tasks: Task[]} = {
	tasks: [],
};
export const taskSlice = createSlice({
	name: "taskSlice",
	initialState: initialState,
	reducers: {
		updateTasks: (state, {payload}) => {
			state.tasks = payload;
		},
	},
});

export const {updateTasks} = taskSlice.actions;

export default taskSlice.reducer;

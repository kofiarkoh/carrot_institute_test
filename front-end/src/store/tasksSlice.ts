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
		addTask: (state, {payload}) => {
			state.tasks = state.tasks.concat([payload]);
		},
		removeTask: (state, {payload}) => {
			state.tasks = state.tasks.filter((i) => i.uuid !== payload);
		},
	},
});

export const {updateTasks, addTask, removeTask} = taskSlice.actions;

export default taskSlice.reducer;

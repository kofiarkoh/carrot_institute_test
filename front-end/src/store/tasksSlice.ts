import {createSlice} from "@reduxjs/toolkit";

export interface Task {
	title: string;
	description: string;
	due_at: string;
	uuid: string;
	status: string;
}
const initialState: {tasks: Task[]; currentTask: Task} = {
	tasks: [],
	currentTask: {title: "", description: "", due_at: "", uuid: "", status: ""},
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
		updateTask: (state, {payload}) => {
			state.tasks = state.tasks.map((i) => {
				if (i.uuid === payload.uuid) {
					return payload;
				}
				return i;
			});
		},
		setCurrentTask: (state, {payload}) => {
			state.currentTask = payload;
		},
	},
});

export const {updateTasks, addTask, removeTask, setCurrentTask, updateTask} =
	taskSlice.actions;

export default taskSlice.reducer;

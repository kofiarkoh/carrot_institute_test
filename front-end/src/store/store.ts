import {
	PreloadedState,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import loginSlice from "./loginSlice";
import tasksSlice from "./tasksSlice";
import snackbarSlice from "./snackbarSlice";

export const rootReducer = combineReducers({
	loginState: loginSlice,
	tasksState: tasksSlice,
	snackbarState: snackbarSlice,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}
export const reduxStore = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

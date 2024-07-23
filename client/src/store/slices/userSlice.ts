import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
	id: null,
	email: null,
	isAuthenticated: false,
	profile: null,
	status: "idle",
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ id: string; email: string; profile: UserState["profile"] }>) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.profile = action.payload.profile;
			state.isAuthenticated = true;
			state.status = "succeeded";
		},
		clearUser: (state) => {
			state.id = null;
			state.email = null;
			state.profile = null;
			state.isAuthenticated = false;
			state.status = "idle";
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.status = "failed";
		},
	},
});

export const { setUser, clearUser, setError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
        },
        signup(state, action) {
            state.user = action.payload;
        },
    },
});

export const { signin, signout, signup } = userSlice.actions;

// Hàm để lấy dữ liệu từ redux
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

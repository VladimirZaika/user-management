import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('/users');

    return response;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
    const response = await axios.get(`/users/${id}`);

    return response;
});

export const fetchRemoveUser = createAsyncThunk('posts/fetchRemoveUser', async (id) => {
    try {
        await axios.delete(`/users/${id}`);
        return id;
    } catch (error) {
        throw error;
    };
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchUsers.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchUserById.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchUserById.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchUserById.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchRemoveUser.pending]: (state, action) => {
            state.posts.items.data = state.posts.items.data.filter(obj => obj.id !== action.meta.arg)
        },
        [fetchRemoveUser.rejected]: (state) => {
            state.posts.status = 'user deletion error';
        },
    },
});

export const userReducer = userSlice.reducer;
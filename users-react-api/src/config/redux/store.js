import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/users';

const store = configureStore({
    reducer: {
        users: userReducer,
    },
});

export default store;
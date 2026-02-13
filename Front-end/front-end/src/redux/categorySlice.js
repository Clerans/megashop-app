import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await client.get('/categories');
    return response.data;
});

const initialState = {
    categories: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Handle response structure { success: true, data: [...] } or just [...]
                state.categories = action.payload.data || action.payload || [];
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export default categorySlice.reducer;

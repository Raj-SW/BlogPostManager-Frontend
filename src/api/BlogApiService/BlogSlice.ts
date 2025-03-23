// src/store/blogSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { deleteBlog } from './BlogService';
import { RootState } from '../../Service/StateManagement/store';

interface BlogState {
  deleting: boolean;
  error: string | null;
}

const initialState: BlogState = {
  deleting: false,
  error: null,
};

export const deleteBlogAsync = createAsyncThunk<void, number, { state: RootState }>(
  'blog/delete',
  async (blogId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue('User not authenticated');
    }
    try {
      await deleteBlog(blogId, token);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteBlogAsync.pending, (state) => {
      state.deleting = true;
      state.error = null;
    });
    builder.addCase(deleteBlogAsync.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteBlogAsync.rejected, (state, action: PayloadAction<any>) => {
      state.deleting = false;
      state.error = action.payload;
    });
  },
});

export default blogSlice.reducer;

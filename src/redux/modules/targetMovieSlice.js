import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from ".";
import axios from "axios";

export const getMovieThunk = createAsyncThunk(
  "getMovie",
  async (payload, api) => {
    try {
      const data = await axios.get(`https://myfirst-repo.herokuapp.com/movies/${payload}`);
      return api.fulfillWithValue(data.data);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

export const editMovieThunk = createAsyncThunk(
  "editMovie",
  async (payload, api) => {
    try {
      axios.patch(`https://myfirst-repo.herokuapp.com/movies/${payload.id}`, payload);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

const initialState = {
  movie: {
    id: "",
    userid: "",
    title: "",
    body: "",
    img: "",
  },
};

export const tagetMovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [getMovieThunk.fulfilled]: (state, action) => {
      state.movie = action.payload;
    },
    [getMovieThunk.rejected]: (state, action) => {
      console.log(state);
      state.error = action.payload;
    },
    [getMovieThunk.pending]: (state, action) => {
      console.log(action);
      console.log(state);
    },
    [editMovieThunk.pending]: (state) => {
      console.log(state);
    },
    [editMovieThunk.fulfilled]: (state, action) => {
      state.movie.body = action.payload.body;
    },
    [editMovieThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export let {} = tagetMovieSlice.actions;
export default tagetMovieSlice.reducer;

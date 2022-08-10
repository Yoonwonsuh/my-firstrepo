import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMoviesThunk = createAsyncThunk(
  "getMovies",
  async (payload, api) => {
    try {
      const data = await axios.get("http://localhost:3001/movies");
      return api.fulfillWithValue(data.data);
    } catch (e) {}
  }
);

export const addMoviesThunk = createAsyncThunk(
  "postMovies",
  async (payload, thunkapi) => {
    try {
      const data = await axios.post("http://localhost:3001/movies", payload);
      return thunkapi.fulfillWithValue(data.data);
    } catch (e) {
      return thunkapi.rejectWithValue(e);
    }
  }
);

export const delMoviesThunk = createAsyncThunk(
  "delMovies",
  async (payload, api) => {
    try {
      axios.delete(`http://localhost:3001/movies/${payload}`);
      return api.fulfillWithValue(payload);
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

const initialState = {
  movies: [],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesThunk.fulfilled]: (state, action) => {
      state.movies = action.payload;
    },
    [getMoviesThunk.rejected]: (state, action) => {
      console.log(state);
      state.error = action.payload;
    },
    [getMoviesThunk.pending]: (state, action) => {
      console.log(action);
      console.log(state);
    },
    [addMoviesThunk.pending]: (state) => {
      console.log(state);
    },
    [addMoviesThunk.fulfilled]: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
    [addMoviesThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [delMoviesThunk.fulfilled]: (state, action) => {
      const target = state.movies.findIndex(
        (movies) => movies.id === action.payload
      );

      state.movies.splice(target, 1);
    },
    [delMoviesThunk.rejected]: () => {},
    [delMoviesThunk.pending]: () => {},
  },
});

export let { clearTodo } = movieSlice.actions;
export default movieSlice.reducer;

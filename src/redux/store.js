import { configureStore } from "@reduxjs/toolkit";
import movies from "./modules/movieSlice";
import movie from "./modules/targetMovieSlice"

export default configureStore({
  reducer: {
    movies,
    movie,
  },
})

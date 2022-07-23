import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../pages/todosSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});

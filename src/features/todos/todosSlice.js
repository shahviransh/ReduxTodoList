import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    addTodo: (state, actions) => {
      state.list.push(actions.payload);
    },
    deleteTodo: (state, actions) => {
      state.list = state.list.filter((todo) => todo.id !== actions.payload);
    },
    editTodo: (state, actions) => {
      const todo = actions.payload;
      state.list = state.list.map((item) => {
        if (item.id === todo.id) {
          item.name = todo.name;
          item.finished = todo.finished;
        }
        return item;
      });
    },
    asyncLoad: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, asyncLoad } = todosSlice.actions;

export default todosSlice.reducer;

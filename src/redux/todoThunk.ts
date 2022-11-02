import { createAsyncThunk } from "@reduxjs/toolkit";

import { TodoData } from "../api/apiTodoData";

const getTodos = createAsyncThunk(
  'todoSlice/getTodos',
  async () => {
    try {
      const list = await new TodoData().getData();
      return list;
    } catch (error) {
      return Promise.reject('You have planned nothing');
    }
  }
)

const addTodo = createAsyncThunk(
  'todoSlice/addTodo',
  async (data: TodoItemType, { rejectWithValue }) => {
    try {
      const list = new TodoData().addData(data);
      return list;
    } catch (error) {
      return rejectWithValue('Did not succeed to ass new item');
    }
  }
)

const changeTodo = createAsyncThunk(
  'todoSlice/changeTodo',
  async (data: TodoItemType, { rejectWithValue }) => {
    try {
      const list = new TodoData().changeData(data);
      return list;
    } catch (error) {
      return rejectWithValue('Can\'t change item');
    }
  }
)

const deleteTodo = createAsyncThunk(
  'todoSlice/deleteTodo',
  async (id: TodoItemType['id'][], { rejectWithValue }) => {
    try {
      const list = new TodoData().deleteData(id);
      return list;
    } catch (error) {
      return rejectWithValue("Can't delete todo");
    }
  }
);

export { getTodos, addTodo, changeTodo, deleteTodo };
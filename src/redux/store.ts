import { configureStore } from "@reduxjs/toolkit"

import todoSlice from './todoSlice';

const MyStore = configureStore({
  reducer: {
    todoList: todoSlice,
  }
})

export { MyStore }
import { configureStore } from "@reduxjs/toolkit"

import modeSlice from "./modeSlice";
import todoSlice from './todoSlice';

const MyStore = configureStore({
  reducer: {
    mode: modeSlice,
    todoList: todoSlice,
  }
})

export { MyStore }
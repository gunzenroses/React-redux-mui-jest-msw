import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { MyDispatch, MyState } from "./types";

export const useMyDispatch = () => useDispatch<MyDispatch>();

export const useMySelector: TypedUseSelectorHook<MyState> = useSelector;

export const useMyState = () => {
  return useMySelector((state: MyState) => state);
}

export const useMyList = () => {
  return useMySelector((state: MyState) => state.todoList);
}


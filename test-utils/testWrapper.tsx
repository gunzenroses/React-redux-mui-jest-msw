import React, { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import { render, RenderOptions } from "@testing-library/react";

import todoSlice from "../src/redux/todoSlice";
import { MyState, MyStoreType } from '../src/redux/types';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<MyState>,
  store?: MyStoreType
}

const setupStore = (preloadedState?: PreloadedState<MyState>) => {
  return configureStore({
    reducer: {
      todoList: todoSlice,
    },
    preloadedState,
  });
}

export const renderWithProviders = (
  ui: ReactElement, 
  {
    preloadedState = {todoList: []},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
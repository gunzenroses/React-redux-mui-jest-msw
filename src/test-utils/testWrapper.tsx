import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import { render, RenderOptions } from "@testing-library/react";

import todoSlice from "../redux/todoSlice";
import modeSlice from "../redux/modeSlice";
import { MyState, MyStoreType } from '../redux/types';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<MyState>,
  store?: MyStoreType
}

const setupStore = (preloadedState?: PreloadedState<MyState>) => {
  return configureStore({
    reducer: {
      mode: modeSlice,
      todoList: todoSlice,
    },
    preloadedState,
  });
}

export const renderWithProviders = (
  ui: ReactElement,
  renderOptions?: ExtendedRenderOptions
) => {
  const store = setupStore({
    mode: 'All',
    todoList: []
  });
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
import { MyStore } from "./store";

export type MyState = ReturnType<typeof MyStore.getState>;
export type MyDispatch = typeof MyStore.dispatch;
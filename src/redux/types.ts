import { MyStore } from "./store";

export type MyStoreType = typeof MyStore;
export type MyState = ReturnType<typeof MyStore.getState>;
export type MyDispatch = typeof MyStore.dispatch;
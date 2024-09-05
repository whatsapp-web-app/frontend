import store from "./index.tsx";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

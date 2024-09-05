import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";
import authSlice from "./slices/auth.slice.ts";
import authService from "../services/auth/auth.service.ts";
import chatService from "../services/chat/chat.service.ts";
import userService from "../services/user/user.service.ts";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [chatService.reducerPath,userService.reducerPath],
};

const rootReducer = combineReducers({
    [authSlice.name]:authSlice.reducer,
    [authService.reducerPath]:authService.reducer,
    [chatService.reducerPath]:chatService.reducer,
    [userService.reducerPath]:userService.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authService.middleware,chatService.middleware,userService.middleware),
});

export default store;


export const persistor = persistStore(store);


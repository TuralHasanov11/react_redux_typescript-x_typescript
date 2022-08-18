import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";
import { githubReducers } from "./github/github.slice";

export const store = configureStore({
  reducer:{
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducers
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
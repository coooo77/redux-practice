import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { apiSlice } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

// define types for redux
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

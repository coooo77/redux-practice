import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import postsReducer from '../features/posts/postsSlice'

export const store = configureStore({
  reducer: { counter: counterReducer, posts: postsReducer },
})

// define types for redux
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

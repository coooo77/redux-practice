import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface User {
  id: string
  name: string
}

export type UserState = User[]

export const initialState: UserState = [
  {
    id: crypto.randomUUID(),
    name: 'Lorem',
  },
  {
    id: crypto.randomUUID(),
    name: 'ipsum',
  },
]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

// 為了避免未來 postsSlice initialState 結構有變化，改在這邊輸出取得所有 posts 的方法
export const selectAllUsers = (state: RootState) => state.users

export const {} = usersSlice.actions

export default usersSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export interface User {
  id: string
  name: string
}

export type UserState = User[]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

export const initialState: UserState = []

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // 等同於 state = action.payload
      return action.payload
    })
  },
})

// 為了避免未來 postsSlice initialState 結構有變化，改在這邊輸出取得所有 posts 的方法
export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId?: User['id']) => state.users.find((user) => user.id === userId)

export const {} = usersSlice.actions

export default usersSlice.reducer

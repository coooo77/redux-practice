import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface Post {
  id: string
  title: string
  content: string
}

export type PostsState = Post[]

export const initialState: PostsState = [
  {
    id: '1',
    title: 'this is title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: '2',
    title: 'this is title2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})

// 為了避免未來 postsSlice initialState 結構有變化，改在這邊輸出取得所有 posts 的方法
export const selectAllPosts = (state: RootState) => state.posts

export const {} = postsSlice.actions

export default postsSlice.reducer

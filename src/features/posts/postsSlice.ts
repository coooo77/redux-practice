import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { User } from '../users/usersSlice'

interface Post {
  id: string
  title: string
  content: string
  userId: string
}

export type PostsState = Post[]

export const initialState: PostsState = [
  {
    id: '1',
    title: 'this is title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    userId: crypto.randomUUID(),
  },
  {
    id: '2',
    title: 'this is title2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    userId: crypto.randomUUID(),
  },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: User['id']) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title,
            content,
            userId,
          },
        }
      },
    },
  },
})

// 為了避免未來 postsSlice initialState 結構有變化，改在這邊輸出取得所有 posts 的方法
export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer

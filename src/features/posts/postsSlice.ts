import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { User } from '../users/usersSlice'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

interface PostsFetched {
  userId: number
  id: number
  title: string
  body: string
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get<PostsFetched[]>(POSTS_URL)
  return data
})

interface AddNewPostParams {
  title: string
  body: string
  userId: string
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: AddNewPostParams) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data as PostsFetched
})

export interface Post {
  id: string
  title: string
  content: string
  userId: string
}

export type PostStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface PostsState {
  posts: Post[]
  status: PostStatus
  error: undefined | string
}

export const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: undefined,
}

const postFetchedToPost = (post: PostsFetched) => {
  return {
    id: String(post.id),
    title: post.title,
    userId: String(post.userId),
    content: post.body,
  }
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadPosts = action.payload.map(postFetchedToPost)
        state.posts = state.posts.concat(loadPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(postFetchedToPost(action.payload))
      })
  },
})

// 為了避免未來 postsSlice initialState 結構有變化，改在這邊輸出取得所有 posts 的方法
export const selectAllPosts = (state: RootState) => state.posts.posts
export const getPostsStatus = (state: RootState) => state.posts.status
export const getPostsError = (state: RootState) => state.posts.error

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer

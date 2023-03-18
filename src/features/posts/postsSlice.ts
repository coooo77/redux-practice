import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { User } from '../users/usersSlice'
import axios from 'axios'
import { sub } from 'date-fns'

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

interface updatePostParams {
  title: string
  body: string
  userId: string
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: updatePostParams) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data as PostsFetched
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost: Partial<Post>) => {
  const { id } = initialPost
  const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
  return response.data as Post
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: { id: string }) => {
  const { id } = initialPost
  const response = await axios.delete(`${POSTS_URL}/${id}`)
  if (response?.status === 200) return initialPost
  return { id: null }
})

export interface Reactions {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Post {
  id: string
  title: string
  content: string
  userId: string
  reactions: Reactions
  date: string
}

export type PostStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface PostsState {
  posts: Post[]
  status: PostStatus
  error: undefined | string
  count: number
}

export const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: undefined,
  count: 0,
}

const postFetchedToPost = (post: PostsFetched, index: number) => {
  return {
    id: String(post.id),
    title: post.title,
    userId: String(post.userId),
    content: post.body,
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
    date: sub(new Date(), { minutes: Math.random() * index }).toISOString(),
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
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }
      },
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: keyof Reactions }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    increaseCount(state) {
      state.count++
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
        state.posts.push(postFetchedToPost(action.payload, state.posts.length))
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload
        if (!id) return
        const otherPost = state.posts.filter((post) => post.id !== id)
        state.posts = otherPost.concat(action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload
        if (!id) return
        state.posts = state.posts.filter((post) => post.id !== id)
      })
  },
})

// 為了避免未來 postsSlice initialState 結構有變化，改在這邊輸出取得所有 posts 的方法
export const selectAllPosts = (state: RootState) => state.posts.posts
export const getPostsStatus = (state: RootState) => state.posts.status
export const getPostsError = (state: RootState) => state.posts.error
export const getCount = (state: RootState) => state.posts.count

export const selectPostById = (state: RootState, postId: string) => state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector(
  // input function
  [selectAllPosts, (state: RootState, userId?: string) => userId],
  // output function
  (posts, userId) => posts.filter((post) => post.userId === userId)
)

export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions

export default postsSlice.reducer

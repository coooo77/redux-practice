import { PayloadAction, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { apiSlice } from '../api/apiSlice'

import { User } from '../users/usersSlice'

import { sub } from 'date-fns'

import type { EntityState } from '@reduxjs/toolkit'

interface PostsFetched {
  id: number
  title: string
  body: string
  userId: number
  date: string
}

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
  reactions?: Reactions
  date: string
}

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.title,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => '/posts',
      transformResponse: (responseData: Post[]) => {
        const loadedPosts = responseData.map((post, index) => {
          if (!post?.date) post.date = sub(new Date(), { minutes: index + 1 }).toString()
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            }
          return post
        })
        return postsAdapter.setAll(initialState, loadedPosts)
      },
      providesTags: (result, error, arg) => {
        const postIds = result ? result?.ids.map((id) => ({ type: 'Post', id })) : []
        return [{ type: 'Post', id: 'LIST' }, ...postIds] as { type: 'Post'; id: number | string }[]
      }
    }),
  }),
})

// hooks
export const {useGetPostsQuery} = extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)
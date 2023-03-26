import { PayloadAction, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { apiSlice } from '../api/apiSlice'

import { User } from '../users/usersSlice'

import { sub } from 'date-fns'

import type { EntityState } from '@reduxjs/toolkit'

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
  body: string
  userId: string
  reactions?: Reactions
  date: string
}

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const initialState = postsAdapter.getInitialState()

function transformPost(post: Post, index: number): Post {
  return {
    ...post,
    date: post.date || new Date(sub(new Date(), { minutes: index + 1 }).toString()).toISOString(),
    reactions: post.reactions || { coffee: 0, rocket: 0, heart: 0, wow: 0, thumbsUp: 0 },
  }
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => '/posts',
      transformResponse: (responseData: Post[]) => postsAdapter.setAll(initialState, responseData.map(transformPost)),
      providesTags: (result, error, arg) => {
        const postIds = result ? result?.ids.map((id) => ({ type: 'Post', id })) : []
        return [{ type: 'Post', id: 'LIST' }, ...postIds] as { type: 'Post'; id: number | string }[]
      },
    }),

    /** @see https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-providestagsinvalidatestags */
    getPostsByUserId: builder.query<EntityState<Post>, string>({
      query: (id: string) => `/posts/?userId=${id}`,
      transformResponse: (responseData: Post[]) => postsAdapter.setAll(initialState, responseData.map(transformPost)),
      providesTags: (result, error, arg) => (result ? [...result.ids.map((id) => ({ type: 'Post' as const, id }))] : []),
    }),

    addNewPost: builder.mutation<void, Pick<Post, 'title' | 'body' | 'userId'>>({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    updatePost: builder.mutation<void, Post>({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: 'PUT',
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),

    deletePost: builder.mutation<void, Post>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),

    addReaction: builder.mutation<void, { postId: Post['id']; reactions: Post['reactions'] }>({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: 'PATCH',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { reactions },
      }),
      async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.entities[postId]
            if (post) post.reactions = reactions
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

// hooks
export const { useGetPostsQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation, useAddReactionMutation, useGetPostsByUserIdQuery } =
  extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)

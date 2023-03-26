import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

export interface User {
  id: string
  name: string
}

const userAdapter = createEntityAdapter<User>()

export const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User>, void>({
      query: () => '/users',
      transformResponse: (response: User[]) => userAdapter.setAll(initialState, response),
      providesTags: (result, error, arg) => {
        const users = result?.ids.map((id) => ({ type: 'User' as const, id })) || []
        return [{ type: 'User' as const, id: 'LIST' }, ...users]
      },
    }),
  }),
})

export const { useGetUsersQuery } = usersApiSlice

import { useAppSelector } from '../../app/utils'
import { useGetUsersQuery } from './usersSlice'
import { Link, useParams } from 'react-router-dom'

import { type Post, useGetPostsByUserIdQuery } from '../posts/postsSlice'
import { EntityState } from '@reduxjs/toolkit'

const UserPage = () => {
  const { userId } = useParams()

  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
  } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: userId ? data?.entities[userId] : undefined,
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  })

  const { data: postsFromUser, isLoading, isSuccess, isError } = useGetPostsByUserIdQuery(userId || '')

  const postToList = (source: EntityState<Post>) => {
    const { ids, entities } = source
    return ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id]?.title}</Link>
      </li>
    ))
  }

  const content =
    isLoading || isLoadingUser ? (
      <p>Loading...</p>
    ) : isSuccess && isSuccessUser ? (
      <ol>{postToList(postsFromUser)}</ol>
    ) : isError || isErrorUser ? (
      <p>Error occurred</p>
    ) : null

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  )
}

export default UserPage

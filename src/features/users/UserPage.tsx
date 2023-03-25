import { useAppSelector } from '../../app/utils'
import { selectUserById } from './usersSlice'
import { Link, useParams } from 'react-router-dom'

import { type Post, useGetPostsByUserIdQuery } from '../posts/postsSlice'
import { EntityState } from '@reduxjs/toolkit'

const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector((state) => selectUserById(state, userId))

  const { data: postsFromUser, isLoading, isSuccess, isError } = useGetPostsByUserIdQuery(userId || '')

  const postToList = (source: EntityState<Post>) => {
    const { ids, entities } = source
    return ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id]?.title}</Link>
      </li>
    ))
  }

  // prettier-ignore
  const content =
    isLoading ? <p>Loading...</p> :
    isSuccess ? <ol>{postToList(postsFromUser)}</ol> :
    isError ? <p>Error occurred</p> :
    null

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  )
}

export default UserPage

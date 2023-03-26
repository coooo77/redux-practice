import { useGetUsersQuery } from '../users/usersSlice'
import { useAppSelector } from '../../app/utils'

import { FC } from 'react'
import { Link } from 'react-router-dom'

interface PropsPostAuthor {
  userId: string
}

const PostAuthor: FC<PropsPostAuthor> = (props) => {
  const { user: author } = useGetUsersQuery(undefined, {
    // 這裡的arg等同於useGetUsersQuery預設回傳的值
    selectFromResult: (params) => {
      const { data } = params
      // 這裡的回傳值會改寫useGetUsersQuery回傳的值
      return { user: data?.entities[props.userId] }
    },
  })
  return <span>by {
    author
      ? <Link to={`/user/${props.userId}`}>{author.name}</Link>
      : 'Unknown author'
  }</span>
}

export default PostAuthor

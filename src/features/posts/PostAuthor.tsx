import { selectAllUsers } from '../users/usersSlice'
import { useAppSelector } from '../../app/utils'

import { FC } from 'react'
import { Link } from 'react-router-dom'

interface PropsPostAuthor {
  userId: string
}

const PostAuthor: FC<PropsPostAuthor> = (props) => {  
  const users = useAppSelector(selectAllUsers)
  const author = users.find((user) => +user.id === +props.userId)
  return <span>by {author ? <Link to={`/user/${props.userId}`}>{author.name}</Link> : 'Unknown author'}</span>
}

export default PostAuthor

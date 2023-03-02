import { selectAllUsers } from '../users/usersSlice'
import { useAppSelector } from '../../app/utils'

const PostAuthor = (payload: { userId: string }) => {
  const users = useAppSelector(selectAllUsers)
  const author = users.find((user) => +user.id === +payload.userId)
  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor

import { useAppSelector } from '../../app/utils'
import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector((state) => selectUserById(state, userId))

  const postsFromUser = useAppSelector((state) => selectPostsByUser(state, userId))

  const postTitles = postsFromUser.map((p, i) => (
    <li key={`${i}_${p.id}`}>
      <Link to={`/post/${p.id}`}>{p.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage

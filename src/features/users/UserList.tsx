import { useGetUsersQuery } from './usersSlice'
import { Link } from 'react-router-dom'

const UserList = () => {
  const { data: users, isSuccess } = useGetUsersQuery()

  const renderedUsers = isSuccess
    ? users.ids.map((id) => (
        <li key={id}>
          <Link to={`/user/${id}`}>{users.entities[id]?.name}</Link>
        </li>
      ))
    : null

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UserList

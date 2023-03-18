import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/utils'
import { getCount, increaseCount } from '../features/posts/postsSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(getCount)
  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="post">POST</Link>
          </li>
          <li>
            <Link to="user">Users</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  )
}

export default Header

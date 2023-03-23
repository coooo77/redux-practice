import { Link } from 'react-router-dom'

const Header = () => {
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
      </nav>
    </header>
  )
}

export default Header

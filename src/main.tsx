import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import redux store
import { store } from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice'

// fetch users right after app starts
store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

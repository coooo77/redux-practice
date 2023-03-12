import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import redux store
import { store } from './app/store'
import { Provider } from 'react-redux'
import { fetchPosts } from './features/posts/postsSlice'
import { fetchUsers } from './features/users/usersSlice'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// fetch users right after app starts
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

//
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

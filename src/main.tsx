import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import redux store
import { store } from './app/store'
import { Provider } from 'react-redux'

import { extendedApiSlice } from './features/posts/postsSlice'


import { BrowserRouter, Routes, Route } from 'react-router-dom'

// fetch users right after app starts
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())

//
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={apiSlice}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
)

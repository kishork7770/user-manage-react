import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import UserDetails from './pages/user-details'
import UserList from './pages/user-list'
import ChangePass from './assets/components/change-pass.jsx'
import Register from './pages/register.jsx'
import dashBoard from './pages/dashboard.jsx'
import Home from './pages/home.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/user-list',
        element: <UserList />
      },
      {
        path: '/user-details',
        element: <UserDetails />
      },
      {
        path: '/change-pass',
        element: <ChangePass />
      },
      {
        path:'/home',
        element:<Home/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

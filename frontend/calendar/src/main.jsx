import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './view/login/login.jsx'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import SignUp from './view/signUp/SignUp.jsx'

const router = createBrowserRouter(
  [{
    path: "/",
    element: <SignUp/>,
    //errorElement:
  },
  {
    path: "/login",
    element: <Login/>,
    //errorElement:
  },
  {
    path: "/calendar",
    element: <App/>
    //errorElement:
  }]

)


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    
  </RouterProvider>
)

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useNavigation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './component/common/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch } from 'react-redux'
import { check_token } from './redux/AuthSlice'
import Addstudent from './pages/Addstudent'
import EditStudent from './pages/EditStudent'

const App = () => {
  const dispatch = useDispatch();
  
  function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      // <Navigate to="/login" />
      navigate('/login')
    );
  }

  const PublicRouteNames = [
    {
      path: "/login",
      Component: <Login />
    },
    {

      path: "/register",
      Component: <Register />
    }
  ]

  const PrivateRouteNames = [
    {
      path: '/',
      Component: <Home />
    },
    {
      path: '/addstudent',
      Component: <Addstudent />
    },

    {
      path: '/edit/:id',
      Component: <EditStudent />
    }
  ]

  useEffect(() => {
    dispatch(check_token())
   }, [dispatch])

  return (
    <>
         <Router>
          <Navbar />
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route
                  Key={index + 1}
                  exact
                  path={route.path}
                  element={route?.Component}
                />
              )
            })}


            {PrivateRouteNames?.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route?.Component}</PrivateRoute>}
                />
              )

            })}
           
          </Routes>
        </Router>
    </>
  )
}

export default App
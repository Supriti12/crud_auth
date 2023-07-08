import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/AuthSlice';

const Navbar = () => {
  const { Logouttoggle } = useSelector(state => state?.Auth);
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const dispatch = useDispatch();
  const log = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
            </li>
            {
              Logouttoggle ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link bg bg-warning">Hi..{name}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={log}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
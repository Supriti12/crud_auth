import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RegLog, loginRequest } from '../redux/AuthSlice'

const initialValue = {
    email: "",
    password: ""
}
const Login = () => {

    const [user, setUser] = useState(initialValue)
    const { redirectTo } = useSelector((state) => state?.Auth);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const validation = () => {
        let error = {}
        if (!user.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
        ) {
            error.email = "Enter a valid Email"
        }
        if (!user.password) {
            error.password = "Password is Required"
        }
        return error
    }


    let name, value
    const postUserData = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "Email is required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
            }
        }
        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "@password is Required" })
                setUser({ ...user, password: "" })
            } else {
                setError({ ...error, password: "" })
                setUser({ ...user, password: value })
            }
        }
    }

    const SubmitInfo = async e => {
        e.preventDefault()
        let ErrorList = validation()
        setError(ErrorList)
        let data = {
            "email": user.email,
            "password": user.password,
        }
        dispatch(loginRequest(data))
    }


    const redirectUser = () => {
        let token = localStorage.getItem("token")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

        if (token !== null && token !== undefined && token !== "") {
            // window.location.pathname = getPathname;
            isInLoginPage && navigate("/");
        }
    }
    useEffect(() => {
        redirectUser()
    }, [redirectTo])

const log=()=>{
    dispatch(RegLog())
}
    return (
        <>
            <div style={{ marginLeft: '360px' }}>
                <div className="col-md-7 mt-5">
                    <div className="card">
                        <div className="card-header">Login  </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email</label>
                                    <input type="email" name="email" className="form-control"

                                        onChange={e => postUserData(e)} />
                                    <span style={{ color: "red" }}> {error.email} </span>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Password</label>
                                    <input type="password" name="password" className="form-control"

                                        onChange={e => postUserData(e)} />
                                    <span style={{ color: "red" }}> {error.password} </span>
                                </div>
                                <button type="submit" onClick={SubmitInfo} className="btn btn-primary">Login</button>
                            </form>
                            <Link onClick={log} to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login

import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { FetchStudent, deleteStudent } from '../redux/StudentSlice';
import { useEffect } from 'react';


const Home = () => {
    const dispatch = useDispatch();
    const { student_data } = useSelector((state) => state?.Student);

    useEffect(() => {
        dispatch(FetchStudent());
        console.log(FetchStudent());
    }, [dispatch]);

    const deleteUserData = async id => {
        await deleteStudent(id)
        dispatch(FetchStudent());
    }
    return (
        <>
            <div className='container-fluid'>
                <Link to="/addstudent" className='btn btn-success mt-2'>Add Student</Link>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">City</th>
                            <th scope="col">Address</th>
                            <th scope="col">Class</th>
                            <th colSpan={2}>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                                {
                                student_data?.data?.map((student, key) => {
                                    return (
                                        <tr key={key}>
                                            <th>{student?.name}</th>
                                            <td>{student?.email}</td>
                                            <td>{student?.phone}</td>
                                            <td>{student?.city}</td>
                                            <th>{student?.address}</th>
                                            <td>{student?.class}</td>
                                            <td><Link to={`/edit/${student?._id}`} className='btn btn-warning'>Edit</Link></td>
                                            <td><button onClick={() => deleteUserData(student._id)} className='btn btn-danger'>Delete</button></td>
                                        </tr>
                                    );
                                })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Home

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../Api/apiUrl'


export const FetchStudent = createAsyncThunk("allstudent/fetch", async () => {
    try {
        let res = await axiosInstance.get("allstudent");
        return res?.data;
    } catch (error) {
        console.log(error);
    }
})

export const AddStudent = async (data) => {
    try {
        let res = await axiosInstance.post("student", data);
        //return res;

    } catch (error) {
        console.log(error);
    }
}


export const Edit = async data => {
    try {
        return await axiosInstance.get(`edit/${data}`)
    }
    catch (error) {
        console.log('Error while calling getUser API', error.message)
    }
}

export const UpdateStudent = async (data, id) => {
    try {
        const res = await axiosInstance.post(`update/${id}`, data)
        return res
    }
    catch (error) {
        console.log('Error while calling editUser API', error.message)
    }
}

export const deleteStudent = async id => {
    try {
        await axiosInstance.delete(`delete/${id}`)
    }
    catch (error) {
        console.log('Error while calling deleteUser API', error.message)
    }
}
const initialState = ({
    student_data: [],
    status: "idel"
})

export const StudentSlice = createSlice({
    name: "StudentData",
    initialState,
    reducer: {},
    extraReducers: {
        [FetchStudent.pending]: (state) => {
            state.status = "loading......";
            state.student_data = null;
        },
        [FetchStudent.fulfilled]: (state, { payload }) => {
            state.status = "idle";
            state.student_data = payload;
        },
        [FetchStudent.rejected]: (state) => {
            state.status = "idel";
        },

    },

})
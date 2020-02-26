import React, {useReducer} from 'react'
import axios from "axios";
import AuthContext from './authContext'
import authReducer from "./authReducer";
import { 
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    USERS_LOADED,
    CLEAR_ERROR,
    LOG_OUT,
    AUTH_ERROR,
    USER_LOADED
 } from "../types";
import setToken from '../../utils/setToken'

const AuthState = (props) => {
    const initialState = {
        user: null,
        userAuth:null,
        errors:null,
        users: null,
        cargando: false
    }
    const [state, dispatch]= useReducer(authReducer, initialState)


    //Get user
    const getUser = async () => {
        if (localStorage.token) {
            setToken(localStorage.token)
        }
        try {
            const res = await axios.get('/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err
            })
        }
    }

    //Get all users
    const getUsers = async () => {
        state.cargando = true
        try {
            const res = await axios.get('auth/all/')
            dispatch({
                type: USERS_LOADED,
                payload: res.data
            })            
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err
            })
        }
            
    }

    // register user
    const registerUser = async userData => {
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res = await axios.post('/register', userData, config)
            dispatch({
                type: SUCCESS_REGISTER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FAIL_REGISTER,
                payload: err.response.data
            })
        }
    }

    // login user
    const loginUser = async userData => {
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res = await axios.post('/auth', userData, config)
            dispatch({
                type: SUCCESS_LOGIN,
                payload: res.data
            })
            getUser()
        } catch (err) {
            dispatch({
                type: FAIL_LOGIN,
                payload: err.response.data
            })
        }
    }

    //Logout user
    const logoutUser = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    const setError = err => {
        dispatch({
            type: FAIL_REGISTER,
            payload: err
        })
    }

    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR
        })
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            users: state.users,
            userAuth: state.userAuth,
            errors: state.errors,
            getUser: getUser,
            getUsers: getUsers,
            cargando: state.cargando,
            registerUser,
            loginUser,
            logoutUser,
            setError,
            clearError
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthState

import { 
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    USERS_LOADED,
    CLEAR_ERROR,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR
 } from "../types";

 export default (state, {type, payload}) => {
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                user: payload,
                userAuth: true,
                errors: null,
                cargando: false
            }
        case USERS_LOADED:
            return{
                ...state,
                users: payload,
                userAuth: true,
                errors: null,
                cargando: false
            }
        case SUCCESS_REGISTER:
        case SUCCESS_LOGIN:
            localStorage.setItem('token', payload.token)
            return{
                ...state,
                
                userAuth: true,
                errors:null,
            }
        case FAIL_REGISTER:
        case FAIL_LOGIN:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                user: null,
                userAuth:null,
                errors: payload,
                cargando: false
            }
        case LOG_OUT:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                user: null,
                userAuth:null,
                errors: null,
            }
        case CLEAR_ERROR:
            return{
                ...state,
                errors:null
            }
        default:
            return state
    }
 }
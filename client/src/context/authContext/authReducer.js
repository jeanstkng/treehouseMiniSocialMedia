import { 
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    SET_ERROR,
    CLEAR_ERROR,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR
 } from "../types";

 export default (state, action) => {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                user: action.payload,
                userAuth: true,
                errors: null,
                loading: true
            }
        case SUCCESS_REGISTER:
        case SUCCESS_LOGIN:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                userAuth: true,
                errors:null,
                loading: true
            }
        case FAIL_REGISTER:
        case FAIL_LOGIN:
        case LOG_OUT:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                user: null,
                userAuth:null,
                errors: action.payload,
                loading: false
            }
        case SET_ERROR:
            return{
                ...state,
                errors: action.payload
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
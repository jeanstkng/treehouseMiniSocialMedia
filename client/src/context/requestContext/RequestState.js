import React, {useReducer} from 'react'
import axios from "axios";
import RequestContext from './requestContext'
import requestReducer from "./requestReducer";
import { 
    GET_REQUESTS,
    REQUESTS_ERROR,
    ADD_REQUEST,
    REMOVE_REQUEST,
    UPDATE_REQUEST,
    CLEAR_SEARCH,
    CLEAR_REQUESTS,
    CLEAR_EDIT,
    SEARCH_REQUEST,
    EDIT_REQUEST
 } from "../types";

const RequestState = (props) => {
    const initialState = {
        requests: [],
        editing:null,
        search:null,
        errors:null
    }
    const [state, dispacth]= useReducer(requestReducer, initialState)

      
    //Get Requests / Obtener Requests
    const getRequests = async () => {
        try {
            const res = await axios.get('/requestFriend')
            dispacth({
                type: GET_REQUESTS,
                payload: res.data
            })    
        } catch (err) {
            dispacth({
                type: REQUESTS_ERROR,
                payload: err.response
            })
        }
    }

    //Crear Request
    const addRequest = async (request) => {
        const config = {
            'Content-Type': 'application/json'
        }
        const res = await axios.post('/requestFriend', request, config)
        try {
            dispacth({
                type: ADD_REQUEST,
                payload: res.data
            })            
        } catch (err) {
            dispacth({
                type: REQUESTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Eliminar Request
    const removeRequest = async (id) => {
        try {
            await axios.delete(`/requestFriend/${id}`)
            dispacth({
                type: REMOVE_REQUEST,
                payload: id
            })    
        } catch (err) {
            dispacth({
                type: REQUESTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Actualizar Request
    const updateRequest = async (request) => {
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.put(`/requestFriend/${request._id}`, request, config)
            dispacth({
                type: UPDATE_REQUEST,
                payload: res.data
            })    
            getRequests()        
        } catch (err) {
            dispacth({
                type: REQUESTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Editar request
    const editRequest = (request) => {
        dispacth({
            type: EDIT_REQUEST,
            payload: request
        })
    }

    const clearEdit = () => {
        dispacth({
            type: CLEAR_EDIT
        })
    }

    const searchRequest = (request) => {
        dispacth({
            type: SEARCH_REQUEST,
            payload: request
        })
    }

    const clearSearch = () => {
        dispacth({
            type: CLEAR_SEARCH
        })
    }

    const clearRequests = () => {
        dispacth({
            type: CLEAR_REQUESTS
        })
    }
    return (
    <RequestContext.Provider
        value={{
            requests: state.requests,
            search: state.search,
            removeRequest,
            getRequests,
            clearRequests,
            addRequest,
            updateRequest,
            searchRequest,
            clearSearch,
            editRequest,
            clearEdit,
            editing: state.editing
        }}
    >{props.children}</RequestContext.Provider>
    )
}

export default RequestState

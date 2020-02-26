import React, {useReducer} from 'react'
import axios from "axios";
import CommentContext from './commentContext'
import commentReducer from "./commentReducer";
import { 
    GET_COMMENTS,
    COMMENTS_ERROR,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT,
    CLEAR_SEARCH,
    CLEAR_COMMENTS,
    CLEAR_EDIT,
    SEARCH_COMMENT,
    EDIT_COMMENT
 } from "../types";

const CommentState = (props) => {
    const initialState = {
        comments: [],
        editing:null,
        search:null,
        errors:null
    }
    const [state, dispacth]= useReducer(commentReducer, initialState)

      
    //Get Comments / Obtener Comments
    const getComments = async () => {
        try {
            const res = await axios.get('/comment')
            dispacth({
                type: GET_COMMENTS,
                payload: res.data
            })    
        } catch (err) {
            dispacth({
                type: COMMENTS_ERROR,
                payload: err.response
            })
        }
    }

    //Crear Comment
    const addComment = async (comment) => {
        const config = {
            'Content-Type': 'application/json'
        }
        const res = await axios.post('/comment', comment, config)
        try {
            dispacth({
                type: ADD_COMMENT,
                payload: res.data
            })            
        } catch (err) {
            dispacth({
                type: COMMENTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Eliminar Comment
    const removeComment = async (id) => {
        try {
            await axios.delete(`/comment/${id}`)
            dispacth({
                type: REMOVE_COMMENT,
                payload: id
            })    
        } catch (err) {
            dispacth({
                type: COMMENTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Actualizar comentario
    const updateComment = async (comment) => {
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.put(`/comment/${comment._id}`, comment, config)
            dispacth({
                type: UPDATE_COMMENT,
                payload: res.data
            })    
            getComments()        
        } catch (err) {
            dispacth({
                type: COMMENTS_ERROR,
                payload: err.response.msg
            })
        }

    }

    //Editar comment
    const editComment = (comment) => {
        dispacth({
            type: EDIT_COMMENT,
            payload: comment
        })
    }

    const clearEdit = () => {
        dispacth({
            type: CLEAR_EDIT
        })
    }

    const searchComment = (comment) => {
        dispacth({
            type: SEARCH_COMMENT,
            payload: comment
        })
    }

    const clearSearch = () => {
        dispacth({
            type: CLEAR_SEARCH
        })
    }

    const clearComments = () => {
        dispacth({
            type: CLEAR_COMMENTS
        })
    }
    return (
    <CommentContext.Provider
        value={{
            comments: state.comments,
            search: state.search,
            removeComment,
            getComments,
            clearComments,
            addComment,
            updateComment,
            searchComment,
            clearSearch,
            editComment,
            clearEdit,
            editing: state.editing
        }}
    >{props.children}</CommentContext.Provider>
    )
}

export default CommentState

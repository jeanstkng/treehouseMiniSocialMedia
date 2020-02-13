import React, {useReducer} from 'react'
import axios from "axios";
import PostContext from './postContext'
import postReducer from "./postReducer";
import { 
    GET_POSTS,
    POSTS_ERROR,
    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    CLEAR_SEARCH,
    CLEAR_POSTS,
    CLEAR_EDIT,
    SEARCH_POST,
    EDIT_POST
 } from "../types";

const PostState = (props) => {
    const initialState = {
        posts: [],
        editing:null,
        search:null,
        errors:null
    }
    const [state, dispacth]= useReducer(postReducer, initialState)

      
    //Get Posts / Obtener Posts
    const getPosts = async () => {
        try {
            const res = await axios.get('/post')
            dispacth({
                type: GET_POSTS,
                payload: res.data
            })    
        } catch (err) {
            dispacth({
                type: POSTS_ERROR,
                payload: err.response
            })
        }
    }

    //Crear Post
    const addPost = async (post) => {
        const config = {
            'Content-Type': 'application/json'
        }
        const res = await axios.post('/post', post, config)
        try {
            dispacth({
                type: ADD_POST,
                payload: res.data
            })            
        } catch (err) {
            dispacth({
                type: POSTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Eliminar Post
    const removePost = async (id) => {
        try {
            await axios.delete(`/post/${id}`)
            dispacth({
                type: REMOVE_POST,
                payload: id
            })    
        } catch (err) {
            dispacth({
                type: POSTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Actualizar post
    const updatePost = async (post) => {
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.put(`/post/${post._id}`, post, config)
            dispacth({
                type: UPDATE_POST,
                payload: res.data
            })    
            getPosts()        
        } catch (err) {
            dispacth({
                type: POSTS_ERROR,
                payload: err.response.msg
            })
        }

    }

    //Editar post
    const editPost = (post) => {
        dispacth({
            type: EDIT_POST,
            payload: post
        })
    }

    const clearEdit = () => {
        dispacth({
            type: CLEAR_EDIT
        })
    }

    const searchPost = (post) => {
        dispacth({
            type: SEARCH_POST,
            payload: post
        })
    }

    const clearSearch = () => {
        dispacth({
            type: CLEAR_SEARCH
        })
    }

    const clearPosts = () => {
        dispacth({
            type: CLEAR_POSTS
        })
    }
    return (
    <PostContext.Provider
        value={{
            posts: state.posts,
            search: state.search,
            removePost,
            getPosts,
            clearPosts,
            addPost,
            updatePost,
            searchPost,
            clearSearch,
            editPost,
            clearEdit,
            editing: state.editing
        }}
    >{props.children}</PostContext.Provider>
    )
}

export default PostState

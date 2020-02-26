import React, {useReducer} from 'react'
import axios from "axios";
import FriendContext from './friendContext'
import friendReducer from "./friendReducer";
import { 
    GET_FRIENDS,
    FRIENDS_ERROR,
    ADD_FRIEND,
    REMOVE_FRIEND,
    UPDATE_FRIEND,
    CLEAR_SEARCH,
    CLEAR_FRIENDS,
    CLEAR_EDIT,
    SEARCH_FRIEND,
    EDIT_FRIEND
 } from "../types";

const FriendState = (props) => {
    const initialState = {
        friends: [],
        editing:null,
        search:null,
        errors:null
    }
    const [state, dispacth]= useReducer(friendReducer, initialState)

      
    //Get Friends / Obtener Friends
    const getFriends = async () => {
        try {
            const res = await axios.get('/friend')
            dispacth({
                type: GET_FRIENDS,
                payload: res.data
            })    
        } catch (err) {
            dispacth({
                type: FRIENDS_ERROR,
                payload: err.response
            })
        }
    }

    //Crear Friend
    const addFriend = async (friend) => {
        const config = {
            'Content-Type': 'application/json'
        }
        const res = await axios.post('/friend', friend, config)
        try {
            dispacth({
                type: ADD_FRIEND,
                payload: res.data
            })            
        } catch (err) {
            dispacth({
                type: FRIENDS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Eliminar Friend
    const removeFriend = async (id) => {
        try {
            await axios.delete(`/friend/${id}`)
            dispacth({
                type: REMOVE_FRIEND,
                payload: id
            })    
        } catch (err) {
            dispacth({
                type: FRIENDS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Actualizar Friend
    const updateFriend = async (friend) => {
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.put(`/friend/${friend._id}`, friend, config)
            dispacth({
                type: UPDATE_FRIEND,
                payload: res.data
            })    
            getFriends()        
        } catch (err) {
            dispacth({
                type: FRIENDS_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Editar friend
    const editFriend = (friend) => {
        dispacth({
            type: EDIT_FRIEND,
            payload: friend
        })
    }

    const clearEdit = () => {
        dispacth({
            type: CLEAR_EDIT
        })
    }

    const searchFriend = (friend) => {
        dispacth({
            type: SEARCH_FRIEND,
            payload: friend
        })
    }

    const clearSearch = () => {
        dispacth({
            type: CLEAR_SEARCH
        })
    }

    const clearFriends = () => {
        dispacth({
            type: CLEAR_FRIENDS
        })
    }
    return (
    <FriendContext.Provider
        value={{
            friends: state.friends,
            search: state.search,
            removeFriend,
            getFriends,
            clearFriends,
            addFriend,
            updateFriend,
            searchFriend,
            clearSearch,
            editFriend,
            clearEdit,
            editing: state.editing
        }}
    >{props.children}</FriendContext.Provider>
    )
}

export default FriendState

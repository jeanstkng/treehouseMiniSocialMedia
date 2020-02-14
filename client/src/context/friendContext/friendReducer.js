import { SEARCH_FRIEND, CLEAR_SEARCH, 
    ADD_FRIEND, REMOVE_FRIEND, UPDATE_FRIEND,
    EDIT_FRIEND, CLEAR_EDIT, GET_FRIENDS, FRIENDS_ERROR,
    CLEAR_FRIENDS } from '../types'

export default (state, {type, payload})=>{
switch(type){
  case GET_FRIENDS:
      return{
          ...state,
          friends: payload
      }
  case REMOVE_FRIEND:
      return{
          ...state,
          friends: state.friends.filter(friend=> friend._id !== payload)
      }
  case ADD_FRIEND:
      return{
          ...state,
          friends: [...state.friends, payload]
      }
  case UPDATE_FRIEND:
      return{
          ...state,
          friends: state.friends.map(friend=> friend._id === payload._id ? payload : friend)
      }
  case EDIT_FRIEND:
      return{
          ...state,
          editing: payload
      }
  case CLEAR_EDIT:
      return{
          ...state,
          editing: null
      }
  case SEARCH_FRIEND:
      const reg = new RegExp(`${payload}`, 'gi')
      return{
          ...state,
          search: state.friends.friends.filter(friend => friend.name.match(reg))
      }
  case FRIENDS_ERROR:
      return{
          ...state,
          friends: [],
          errors: payload
      }
  case CLEAR_SEARCH:
      return{
          ...state,
          search: null
      }
  case CLEAR_FRIENDS:
      return{
          ...state,
          search: null,
          editing: null,
          friends: [],
          errors: null
      }
  default:
      return state
}
}
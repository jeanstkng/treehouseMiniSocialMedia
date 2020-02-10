import { SEARCH_POST, CLEAR_SEARCH, 
    ADD_POST, REMOVE_POST, UPDATE_POST,
    EDIT_POST, CLEAR_EDIT, GET_POSTS, POSTS_ERROR,
    CLEAR_POSTS } from '../types'

export default (state, {type, payload})=>{
switch(type){
  case GET_POSTS:
      return{
          ...state,
          posts: payload
      }
  case REMOVE_POST:
      return{
          ...state,
          posts: state.posts.filter(post=> post._id !== payload)
      }
  case ADD_POST:
      return{
          ...state,
          posts: [...state.posts, payload]
      }
  case UPDATE_POST:
      return{
          ...state,
          posts: state.posts.map(post=> post._id === payload._id ? payload : post)
      }
  case EDIT_POST:
      return{
          ...state,
          editing: payload
      }
  case CLEAR_EDIT:
      return{
          ...state,
          editing: null
      }
  case SEARCH_POST:
      const reg = new RegExp(`${payload}`, 'gi')
      return{
          ...state,
          search: state.posts.filter(post => post.name.match(reg))
      }
  case POSTS_ERROR:
      return{
          ...state,
          posts: [],
          errors: payload
      }
  case CLEAR_SEARCH:
      return{
          ...state,
          search: null
      }
  case CLEAR_POSTS:
      return{
          ...state,
          search: null,
          editing: null,
          posts: [],
          errors: null
      }
  default:
      return state
}
} 
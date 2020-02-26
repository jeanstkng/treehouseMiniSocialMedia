import { SEARCH_COMMENT, CLEAR_SEARCH, 
    ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT,
    EDIT_COMMENT, CLEAR_EDIT, GET_COMMENTS, COMMENTS_ERROR,
    CLEAR_COMMENTS } from '../types'

export default (state, {type, payload})=>{
switch(type){
  case GET_COMMENTS:
      return{
          ...state,
          comments: payload
      }
  case REMOVE_COMMENT:
      return{
          ...state,
          comments: state.comments.filter(comment=> comment._id !== payload)
      }
  case ADD_COMMENT:
      return{
          ...state,
          comments: [...state.comments, payload]
      }
  case UPDATE_COMMENT:
      return{
          ...state,
          comments: state.comments.map(comment=> comment._id === payload._id ? payload : comment)
      }
  case EDIT_COMMENT:
      return{
          ...state,
          editing: payload
      }
  case CLEAR_EDIT:
      return{
          ...state,
          editing: null
      }
  case SEARCH_COMMENT:
      const reg = new RegExp(`${payload}`, 'gi')
      return{
          ...state,
          search: state.comments.filter(comment => comment.name.match(reg))
      }
  case COMMENTS_ERROR:
      return{
          ...state,
          comments: [],
          errors: payload
      }
  case CLEAR_SEARCH:
      return{
          ...state,
          search: null
      }
  case CLEAR_COMMENTS:
      return{
          ...state,
          search: null,
          editing: null,
          comments: [],
          errors: null
      }
  default:
      return state
}
} 
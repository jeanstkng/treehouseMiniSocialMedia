import { SEARCH_REQUEST, CLEAR_SEARCH, 
    ADD_REQUEST, REMOVE_REQUEST, UPDATE_REQUEST,
    EDIT_REQUEST, CLEAR_EDIT, GET_REQUESTS, REQUESTS_ERROR,
    CLEAR_REQUESTS } from '../types'

export default (state, {type, payload})=>{
switch(type){
  case GET_REQUESTS:
      return{
          ...state,
          requests: payload
      }
  case REMOVE_REQUEST:
      return{
          ...state,
          requests: state.requests.filter(request=> request._id !== payload)
      }
  case ADD_REQUEST:
      return{
          ...state,
          requests: [...state.requests, payload]
      }
  case UPDATE_REQUEST:
      return{
          ...state,
          requests: state.requests.map(request=> request._id === payload._id ? payload : request)
      }
  case EDIT_REQUEST:
      return{
          ...state,
          editing: payload
      }
  case CLEAR_EDIT:
      return{
          ...state,
          editing: null
      }
  case SEARCH_REQUEST:
      const reg = new RegExp(`${payload}`, 'gi')
      return{
          ...state,
          search: state.requests.requests.filter(request => request.name.match(reg))
      }
  case REQUESTS_ERROR:
      return{
          ...state,
          requests: [],
          errors: payload
      }
  case CLEAR_SEARCH:
      return{
          ...state,
          search: null
      }
  case CLEAR_REQUESTS:
      return{
          ...state,
          search: null,
          editing: null,
          requests: [],
          errors: null
      }
  default:
      return state
}
}
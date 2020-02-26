import React,{useState,useContext,useEffect} from 'react'
import CommentContext from '../../context/commentContext/commentContext'

const CommentForm = ({post}) => {
    
const {addComment, editing, clearEdit, updateComment} = useContext(CommentContext)
useEffect(() => {
  if(editing !== null){
    setComment(editing)
  }
  else{
    setComment({
      content: '',
      postParent: post._id
    })
  }
}, [editing])
const [ comment, setComment ] = useState({
  content: '',
  postParent: post._id
})
const { content } = comment

const handleChange = e =>{
  setComment({
    ...comment,
    content: e.target.value
  })
}
const onsubmit = e =>{
  e.preventDefault()
  if (editing !== null) {
    updateComment(comment)
    clearEdit()
  }
  else{
    addComment(comment)
    setComment({
      content: '',
      postParent: post._id
    })
  }
}
  return (
      <div>
          
      <form onSubmit={onsubmit} >

        <div className="form-group row">
          <div className="col-sm-10">
            <input  className="form-control" type="text" placeholder="Escriba su comentario" name="content" value={content} onChange={handleChange}/>
          </div>

          <div className="col-sm-2">
            <input type="submit" value={editing !== null ? 'Actualizar Comentario' : 'Anadir Comentario'} className="btn btn-primary mr-4" />
            {editing !== null ? <input type="button" onClick={clearEdit} value="Cancelar" className="btn btn-secondary"/> : null}
          </div>
        </div>
      
      </form>

      </div>
  )
}

export default CommentForm

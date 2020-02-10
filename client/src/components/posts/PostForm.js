import React,{useState,useContext,useEffect} from 'react'
import PostContext from '../../context/postContext/postContext'

const PostForm = () => {
    
const {addPost, editing, clearEdit, updatePost} = useContext(PostContext)
  useEffect(() => {
    if(editing !== null){
      setPost(editing)
    }
    else{
      setPost({
        title: '',
        contentText: ''
      })
    }
  }, [editing])
  const [ post, setPost ] = useState({
    title: '',
    contentText: ''
  })
  const {title, contentText} = post

  const handleChange = e =>{
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }
  const onsubmit = e =>{
    e.preventDefault()
    if (editing !== null) {
      updatePost(post)
      clearEdit()
    }
    else{
      addPost(post)
      setPost({
        title: '',
        contentText: ''
      })
    }
  }
    
    return (
        <div>
            
        <form onSubmit={onsubmit} >
          <div className="form-group row">
            <label className="col-form-label col-sm-2">Titulo</label>
            <div className="col-sm-10">
             <input  className="form-control" type="text" placeholder="Titulo" name="title" value={title} onChange={handleChange}/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2">Contenido</label>
            <div className="col-sm-10">
              <input  className="form-control" type="text" placeholder="Contenido" name="contentText" value={contentText} onChange={handleChange}/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2"></label>
            <div className="col-sm-10">
              <input type="submit" value={editing !== null ? 'Actualizar Post' : 'Anadir Post'} className="btn btn-primary mr-4" />
              {editing !== null ? <input type="button" onClick={clearEdit} value="Cancelar" className="btn btn-secondary"/> : null}
            </div>
          </div>
        
        </form>

        </div>
    )
}

export default PostForm

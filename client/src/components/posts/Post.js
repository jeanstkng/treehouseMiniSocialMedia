import React,{useContext, useState} from 'react'
import PostContext from '../../context/postContext/postContext'
import Modal from 'react-bootstrap/Modal'
import PostForm from './PostForm'
import AuthContext from '../../context/authContext/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Post = ({post}) => {
    const {_id, title, contentText, points} = post
    const {removePost, editPost, editing, addPost, setPost, clearEdit, updatePost} = useContext(PostContext)
    const { user } = useContext(AuthContext)
    
    const handleRemove=()=>{
        removePost(_id)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)
                              editPost(post)}

    

    return (
        <div>
             <br/>
          <div className="border rounded shadow">
            
                {post.user === user._id ? 
                <div>
                    <button className="btn btn-secondary mx-2 my-2" onClick={handleShow} >
                        Editar
                    </button>
                    <button className="btn btn-danger mx-2 my-2" onClick={handleRemove}>
                        Borrar
                    </button>
                </div> : null}
                
            <div className="row">
                <div className="col-md-10">
                    <h3 className=" mx-2 my-2">{title}</h3>
                    <p className="text-justify mx-2 my-2">{contentText}</p>
                </div>
                <div className="col-md-2 mt-3">
                    <div>
                        <FontAwesomeIcon icon="arrow-up" />
                    </div>
                    <div className="my-2">
                        <FontAwesomeIcon icon="arrow-down" />
                    </div>
                </div>
            </div>
          </div>
          
                
            {editing === null ? handleClose : 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title> Editar Publicacion </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br/>
                    <PostForm/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            }

        </div>
    )
}

export default Post

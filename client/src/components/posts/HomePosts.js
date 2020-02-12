import React,{useContext,useState, useEffect} from 'react'
import Post from './Post'
import PostContext from '../../context/postContext/postContext'
import PostForm from './PostForm'
import Modal from 'react-bootstrap/Modal'

const HomePosts = () => {
    const { posts , search , getPosts } = useContext(PostContext)
        useEffect(()=>{
            getPosts()
            // eslint-disable-next-line
        })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)}
    return (
        
        <div className="container">
            <br/>
            <div className="text-center">
            <button className="btn btn-primary" onClick={handleShow}>Crear Publicacion</button>
            </div>
            <hr/>
            <div className="col-md-12">
                { search != null ?
                  search.map(post => <Post key={post._id} post={post} />) :
                  posts.map(post => <Post key={post._id} post={post} />)}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title> Crear Publicacion </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br/>
                    <PostForm/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HomePosts
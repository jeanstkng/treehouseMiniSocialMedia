import React,{useContext, useState, useEffect} from 'react'
import PostContext from '../../context/postContext/postContext'
import Modal from 'react-bootstrap/Modal'
import PostForm from './PostForm'
import AuthContext from '../../context/authContext/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Post = ({post}) => {

    const {removePost, editPost, editing, addPost, setPost, clearEdit, updatePost} = useContext(PostContext)
    const { user,getUser } = useContext(AuthContext)

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    },[])

    const {_id, title, contentText, points} = post

    const handleRemove=()=>{
        removePost(_id)
    }

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => {setShow(true)
                              editPost(post)}
    
    const usuario = user._id


    let counter = (points.filter(puntos => puntos.isPositive === true)).length
    let counter2 = (points.filter(puntos => puntos.isPositive === false)).length
    let total

    const updateCounter =()=> {

        counter = (points.filter(puntos => puntos.isPositive === true)).length
        counter2 = (points.filter(puntos => puntos.isPositive === false)).length
                

        console.log('eluno'+(counter - counter2))
        console.log(counter2 - counter)
    }

    const setPointUp = () => {
        const existe = post.points.find(points => points.user === usuario)
        console.log(existe)
        if(existe && existe.isPositive === false){
            let filtrado = post.points.filter(points => points !== existe)
            updatePost({
                ...post,
                points: [
                    ...filtrado,
                    {
                        ...existe,
                        isPositive: true
                    }
                ]
            })
        }
        else if(!existe){
            updatePost({
                ...post,
                points: [
                    ...points,
                    {
                        isPositive: true,
                        user: usuario
                    }
                ]
            })
            //console.log(post)
        }
        else{
            console.log('ya likeado')
        }
        updateCounter()
        console.log(post)
    }

    const setPointDown = () => {
        const existePositivo = post.points.find(points => points.user === usuario)
        console.log(existePositivo)
        if(existePositivo && existePositivo.isPositive === true){
            let filtrado = post.points.filter(points => points !== existePositivo)
            updatePost({
                ...post,
                points: [
                    ...filtrado,
                    {
                        ...existePositivo,
                        isPositive: false
                    }
                ]
            })
        }
        else if (!existePositivo) {
            updatePost({
                ...post,
                points: [
                    ...points,
                    {
                        isPositive: false,
                        user: usuario
                    }
                ]
            })
        }
        else {
            console.log('ya listo')
        }
        updateCounter()
        console.log(post)
    }
    

    return (
        <div>
             <br/>
          <div className="border rounded shadow">
            
                {post.user === user._id ? <div>
                    <button className="btn btn-secondary mx-2 my-2" onClick={handleShow} >
                        Editar
                    </button>
                    <button className="btn btn-danger mx-2 my-2" onClick={handleRemove}>
                        Borrar
                    </button>
                </div> : null}
                
            <div className="row">
                <div className="col-sm-10">
                    <h3 className=" mx-2 my-2">{title}</h3>
                    <p className="text-justify mx-2 my-2">{contentText}</p>
                </div>
                <div className="col-sm-2 mt-3">
                    <div className="row" onClick={setPointUp}>
                        <FontAwesomeIcon icon="arrow-up" />
                    </div>
                    <div className="row">
                        
                        <p>
                            { counter - counter2 }
                        </p>
                        
                    </div>
                    <div className="row mb-2" onClick={setPointDown}>
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

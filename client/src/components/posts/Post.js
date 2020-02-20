import React,{useContext, useState, useEffect} from 'react'
import PostContext from '../../context/postContext/postContext'
import Modal from 'react-bootstrap/Modal'
import PostForm from './PostForm'
import AuthContext from '../../context/authContext/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FriendContext from '../../context/friendContext/friendContext'
import RequestContext from '../../context/requestContext/requestContext'

const Post = ({post}) => {

    const {removePost, editPost, editing, updatePost} = useContext(PostContext)
    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)
    const { getFriends, updateFriend, friends, addFriend } = useContext(FriendContext)
    const { addRequest, getRequests, requests } = useContext(RequestContext)

    useEffect( () => {
        getUser()
        getFriends()
        // eslint-disable-next-line
    },[])

    useEffect( () => {
        getUsers()
        getRequests()
        // eslint-disable-next-line
    },[])


    const {_id, title, contentText, points} = post

    const handleRemove=()=>{
        removePost(_id)
    }

    //console.log(users)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => {setShow(true)
                              editPost(post)}

                              
    const [mostrar, setMostrar] = useState(false)

    const cerrarSoli = () => setMostrar(false)
    const mostrarSoli = () => {setMostrar(true)}

    const enviarSolicitud = () => {
        if(friends && user && requests)
        {
            if(!friends.find(friends => friends.owner === user._id)){
                //!friends.find(friends => friends.owner === user._id).friends.find(friend => friend.person === post.user
                if(!requests.find(request => request.sender === user._id && request.receiver === post.user && (request.isCanceled !== true || request.isAccepted !== true))){
                    addRequest({
                        sender: user._id,
                        receiver: post.user,
                        isCanceled: false,
                        isAccepted: false
                    })
                }
            }
        }
        console.log('solicitud enviada')
        console.log(requests)
    }

    /*const actualizarAmigos = () => {
        const existenAmigos = friends.find(friend => friend.owner === user._id)
        const existenAmigosReceptor = friends.find(friend => friend.owner === post.user)
    
        if(existenAmigos && (existenAmigosReceptor)){
    
            if(existePer && existePerReceptor && existePerReceptor.isAccepted !== true){
                const amigosFilt = existenAmigos.friends.filter(friends => friends !== existePer)
                const amigosFiltReceptor = existenAmigosReceptor.friends.filter(friends => friends !== existePerReceptor)
                console.log('existen registros y sobreescribiendo')
                console.log(amigosFilt)
                
                updateFriend({
                        ...existenAmigos,
                        friends: [
                            ...amigosFilt,
                            {
                                ...existePer,
                                isAccepted: true
                            }
                        ]
                })
                updateFriend({
                    ...existenAmigosReceptor,
                    friends: [
                        ...amigosFiltReceptor,
                        {
                            ...existePerReceptor,
                            isAccepted: true
                        }
                    ]
                })
            }

        }
        if(existenAmigos && existenAmigosReceptor){
            const existePer = existenAmigos.friends.find(friend => friend.person === post.user) 
            const existePerReceptor = existenAmigosReceptor.friends.find(friend => friend.person === user._id)
        
            const amigosFilt = existenAmigos.friends.filter(friends => friends !== existePer)
            const amigosFiltReceptor = existenAmigosReceptor.friends.filter(friends => friends !== existePerReceptor)
            console.log('si hay registros')
            console.log(amigosFilt)
            //existen amigos asociados al usuario
            updateFriend({
                    ...existenAmigos,
                    friends: [
                        ...amigosFilt,
                        {
                            ...existenAmigos,
                            person: users.find(user => user._id === post.user)._id,
                            isAccepted: true
                        }
                    ]
            })
            updateFriend({
                ...existenAmigosReceptor,
                friends: [
                    ...amigosFiltReceptor,
                    {
                        ...existenAmigosReceptor,
                        person: user._id,
                        isAccepted: false
                    }
                ]
            })
        }
        else{
            console.log('creacion de amigos')
            addFriend({
                owner: user._id,
                friends: [
                    {
                        person: users.find(user => user._id === post.user)._id,
                        isAccepted: true
                    }
                ]
            })
            addFriend({
                owner: post.user,
                friends: [
                    {
                        person: user._id,
                        isAccepted: false
                    }
                ]
            })
        }
        setMostrar(false)
        console.log(friends)
    }*/
    
    let counter = (points.filter(puntos => puntos.isPositive === true)).length
    let counter2 = (points.filter(puntos => puntos.isPositive === false)).length

    const updateCounter =()=> {

        counter = (points.filter(puntos => puntos.isPositive === true)).length
        counter2 = (points.filter(puntos => puntos.isPositive === false)).length
                
    }

    const setPointUp = () => {
        const usuario = user._id
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
        //console.log(post)
    }

    const setPointDown = () => {
        const usuario = user._id
        const existePositivo = post.points.find(points => points.user === usuario)
        //console.log(existePositivo)
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
            console.log('---')
        }
        updateCounter()
        //console.log(post)
    }
    

    return (
        <div>
             <br/>
          <div className="border rounded shadow" >
            
                {user ? post.user === user._id ? <div>
                    <button className="btn btn-secondary mx-2 my-2" onClick={handleShow} >
                        Editar
                    </button>
                    <button className="btn btn-danger mx-2 my-2" onClick={handleRemove}>
                        Borrar
                    </button>
                </div> : null : null}
                
            <div className="row">
                <div className="col-md-2 col-sm-2">
                    <p className="text-center mx-2 my-2 font-weight-bold">Usuario</p>
                    <p onClick={mostrarSoli} className="text-center mx-2 my-2 font-weight-bold">{users && post ? users.find(user => user._id === post.user).name : null}</p>
                </div>
                <div className="col-md-8 col-sm-6">
                    <h3 className=" mx-2 my-2">{title}</h3>
                    <p className="text-justify mx-2 my-2">{contentText}</p>
                </div>
                <div className="col-md-2 mt-3 d-flex justify-content-center col-sm-2">
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
          <br/>
          
                
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

            <Modal show={mostrar} onHide={cerrarSoli}>
                <Modal.Header closeButton>
                <Modal.Title> Desea enviar una solicitud a este usuario? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row text-center">
                        <div className="col-3">
                            <button onClick={enviarSolicitud} className="btn btn-success" >Si</button>
                        </div>
                        <div className="col-3">
                        <button onClick={cerrarSoli} className="btn btn-warning" >No</button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Post

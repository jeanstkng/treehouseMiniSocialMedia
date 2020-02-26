import React,{useContext, useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import CommentContext from '../../context/commentContext/commentContext'
import AuthContext from '../../context/authContext/authContext'

const Comment = ({comment}) => {

    const {removeComment, editComment, editing, updateComment} = useContext(CommentContext)
    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => {setShow(true)
                              editComment(comment)}
    
console.log(comment)
    return (
        <div className="row mx-5 my-2">
            <p className="col-sm-4">{users && comment ? users.find(user => user._id === comment.user) 
            ? users.find(user => user._id === comment.user).name : null : null}</p>
            <p className="col-sm-8">{comment ? comment.content : null}</p>
        </div>
    )
}

export default Comment

import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
import RequestContext from '../../context/requestContext/requestContext'
import FriendContext from '../../context/friendContext/friendContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Request = ({request}) => {
    const {requests,search, getRequests, removeRequest} = useContext(RequestContext)
    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)
    const { getFriends, updateFriend, friends, addFriend } = useContext(FriendContext)

    useEffect( () => {
        getUser()
        getRequests()
        // eslint-disable-next-line
    },[])

    useEffect( () => {
        getUsers()
        getFriends()
        // eslint-disable-next-line
    },[])

    const aceptarSolicitud = () => {
        if(friends){
            const existeRegistro = friends.find(friends => friends.owner === request.receiver)
            if(existeRegistro){
                updateFriend({
                    ...existeRegistro,
                    friends: [
                        ...existeRegistro.friends,
                        {
                            person: request.sender
                        }
                    ]
                })
            }
            else {
                addFriend({
                    owner: request.receiver,
                    friends: [
                        {person: request.sender}
                    ]
                })
            }
            const existeRegistroEmisor = friends.find(friends =>friends.owner === request.sender)
            if (existeRegistroEmisor) {
                updateFriend({
                    ...existeRegistroEmisor,
                    friends: [
                        ...existeRegistroEmisor.friends,
                        {
                            person: request.receiver
                        }
                    ]
                })
            } else {
                addFriend({
                    owner: request.sender,
                    friends: [
                        {person: request.receiver}
                    ]
                })
            }
            declinarSolicitud()
        }
    }

    const declinarSolicitud = () => {
        removeRequest(request._id)
    }

    return (
        <div>
            
            <div className="row">
                <p className="col-sm-6">
                    {users && users ? users.find(user => user._id === request.sender).name : null}
                </p>
                <a className="col-auto" onClick={aceptarSolicitud}>
                <FontAwesomeIcon icon="check"  />
                </a>
                <a className="col-auto" onClick={declinarSolicitud}>
                <FontAwesomeIcon icon="trash-alt"  />
                </a>
            </div>
            
        </div>
    )
}

export default Request

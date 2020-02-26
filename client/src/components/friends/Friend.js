import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
import FriendContext from '../../context/friendContext/friendContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Friend = ({friend}) => {
    const {updateFriend, friends, getFriends} = useContext(FriendContext)
    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)

    useEffect( () => {
        getUser()
        getFriends()
        // eslint-disable-next-line
    },[])

    useEffect( () => {
        getUsers()
        // eslint-disable-next-line
    },[])

    const eliminarAmigo = () => {
        if(friends && user){
            const eliminadoOwner = friends.find(friends => friends.owner === friend.person)
            const filtradoElim = eliminadoOwner.friends.filter(friends => friends.person !== user._id)
            updateFriend({
                ...eliminadoOwner,
                friends: [
                    ...filtradoElim
                ]
            })

            const amigosOwner = friends.find(friends => friends.owner === user._id)
            const filtrado = amigosOwner.friends.filter(friends => friends.person !== friend.person)
            updateFriend({
                ...amigosOwner,
                friends: [
                    ...filtrado
                ]
            })

        }
    }

    return (
        <div>

            <div className="row">
                <p className="col-sm-5">
                    {users && user ? users.find(user => user._id === friend.person).name : null}
                </p>
                <a className="col-auto" onClick={eliminarAmigo}>
                    <FontAwesomeIcon icon="trash-alt"  />
                </a>
            </div>
        </div>
    )
}

export default Friend

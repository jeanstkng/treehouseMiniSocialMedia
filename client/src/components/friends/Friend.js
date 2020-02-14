import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
import FriendContext from '../../context/friendContext/friendContext'

const Friend = ({friend}) => {

    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)

    useEffect( () => {
        getUser()

        // eslint-disable-next-line
    },[])

    useEffect( () => {
        getUsers()
        // eslint-disable-next-line
    },[])

    console.log(friend)

    return (
        <div>
            <p>
                {users ? users.find(user => user._id === friend.person && friend.isAccepted === true) ? users.find(user => user._id === friend.person && friend.isAccepted === true).name : null  : null}
            </p>
        </div>
    )
}

export default Friend

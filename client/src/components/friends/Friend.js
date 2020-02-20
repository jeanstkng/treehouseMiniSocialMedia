import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
import FriendContext from '../../context/friendContext/friendContext'

const Friend = ({friend}) => {
    const {friends,search, getFriends} = useContext(FriendContext)
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

    console.log(friend)

    return (
        <div>
            <p>
                {users && user ? users.find(user => user._id === friend.person).name : null}
            </p>
        </div>
    )
}

export default Friend

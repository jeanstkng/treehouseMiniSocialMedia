import React,{useContext,useEffect} from 'react'
import FriendContext from '../../context/friendContext/friendContext'
import AuthContext from '../../context/authContext/authContext'
import RequestContext from '../../context/requestContext/requestContext'
import Friend from '../friends/Friend'

const SidebarLeft = () => {

    const {friends,search, getFriends, updateFriend} = useContext(FriendContext)
    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)
    const {requests, getRequests, updateRequest} = useContext(RequestContext)

    useEffect(() => {
        getFriends()
        getRequests()
        // eslint-disable-next-line
      }, [])
      
    useEffect(() => {
        getUser()
        getUsers()
        // eslint-disable-next-line
      }, [])

    const handleSolicitud = (acepto) => {
        //const existenAmigosEmisor = friends.find(friend => friend.friends.find(fri => fri.person === user._id).isAccepted === true)
        /*const existenAmigos = friends.find(friend => friend.owner === user._id)
        acepto = true
        if(acepto && existenAmigos){
            const existePer = existenAmigos.friends.find(friend => friend.isAccepted === false) 
            const amigosFilt = existenAmigos.friends.filter(friends => friends !== existePer)
    
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
        }
        else if(!acepto && existenAmigos){
            const existePer = existenAmigos.friends.find(friend => friend.isAccepted === false) 
    
            const amigosFilt = existenAmigos.friends.filter(friends => friends !== existePer)
            updateFriend({
                ...existenAmigos,
                    friends: [
                        ...amigosFilt
                    ]
            })
        }*/
    }

    return (
        <div id="left-sidebar-wrapper">
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <a href="/#">
                  <h4 className="text-light mt-4 font-weight-bold">Amigos</h4>
                </a>
            </li>
            <li>
                { friends && user ? friends.find(friends => friends.owner === user._id) ?
                friends.find(friends => friends.owner === user._id).friends.map(friend => <Friend key={friend._id} friend={friend} />) : null : null}
                
            </li>
            <li >
                <a href="/#">
                  <h4 className="text-light mt-4 font-weight-bold">Solicitudes</h4>
                </a>
            </li>
            <li>
                {friends && user && users && requests ? requests.filter(requests => requests.receiver === user._id).map(request => users.find(user => user._id === request.sender).name) : null}
            </li>
            {/* <li>
                <a data-toggle="collapse" href="/#" aria-expanded="false">Dashboard <span className="caret"></span></a>
                <div className="collapse sub-bar" id="dashboard">
                    <a href="/#">Dashboard Sub 1</a>
                    <a data-toggle="collapse" href="/#" aria-expanded="false">Dashboard Sub 2 <span className="caret"></span></a>
                    <div className="collapse sub-bar" id="dashboard-sub-2">
                        <a href="/#">Dashboard Sub Sub 1</a>
                        <a data-toggle="collapse" href="/#" aria-expanded="false">Dashboard Sub Sub 2 <span className="caret"></span></a>
                        <div className="collapse sub-bar" id="dashboard-sub-sub-2">
                            <a href="/#">Dashboard Sub Sub Sub 1</a>
                            <a href="/#">Dashboard Sub Sub Sub 2</a>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a data-toggle="collapse" href="/#" aria-expanded="false">Shortcuts <span className="caret"></span></a>
                <div className="collapse sub-bar" id="shortcuts"> 
                    <a data-toggle="collapse" href="#shortcuts-sub-1" aria-expanded="false">Shortcuts Sub 1 <span className="caret"></span></a>
                    <div className="collapse sub-bar" id="shortcuts-sub-1">
                        <a href="/#">Shortcuts Sub Sub 1</a>
                        <a href="/#">Shortcuts Sub Sub 2</a>
                    </div>
                    <a href="/#">Shortcuts Sub 2</a>
                </div>
            </li>
            <li>
                <a href="/#">Overview</a>
            </li>
            <li>
                <a href="/#">Events</a>
            </li>
            <li>
                <a href="/#">About</a>
            </li>
            <li>
                <a href="/#">Services</a>
            </li>
            <li>
                <a href="/#">Contact</a>
            </li> */}
        </ul>
    </div>
       
    )
}

export default SidebarLeft

import React,{useContext,useEffect} from 'react'
import FriendContext from '../../context/friendContext/friendContext'
import AuthContext from '../../context/authContext/authContext'
import RequestContext from '../../context/requestContext/requestContext'
import Friend from '../friends/Friend'
import Request from '../friends/Request'

const SidebarLeft = () => {

    const {friends, getFriends} = useContext(FriendContext)
    const { user,users,getUser,getUsers, cargando } = useContext(AuthContext)
    const {requests, getRequests} = useContext(RequestContext)

    useEffect(() => {
        getFriends()
      }, [friends])
    
    useEffect(() => {
       getRequests()
    }, [requests])

    useEffect(() => {
        getUser()
        getUsers()
        // eslint-disable-next-line
      }, [])

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
            <li className="sidebar-brand">
                <a href="/#">
                  <h4 className="text-light mt-4 font-weight-bold">Solicitudes</h4>
                </a>
            </li>
            <li>
                {user && users && requests ? requests.filter(requests => requests.receiver === user._id).map(request => <Request key={request._id} request={request} />) : null}
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

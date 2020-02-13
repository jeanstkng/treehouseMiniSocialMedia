import React, {useContext} from 'react'
import authContext from "../../context/authContext/authContext";

const SidebarRight = () => {
    const { logoutUser, userAuth } = useContext(authContext)
    
    return (
        <div id="right-sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a >TreeHouse</a>
                </li>

                <button onClick={logoutUser} className="caret btn btn-light" >Cerrar Sesión</button>
                <li>
                    <a data-toggle="collapse" aria-expanded="false"> <span className="caret"></span></a>
                    <div className="collapse in sub-bar" id="recent-search">
                        <a >#1</a>
                        <a >#2</a>
                        <a >#3</a>
                        <a >#4</a>
                    </div>
                </li>
            </ul>
        </div>
  )
}

export default SidebarRight

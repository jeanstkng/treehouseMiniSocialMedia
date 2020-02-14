import React, {useContext} from 'react'
import authContext from "../../context/authContext/authContext";

const SidebarRight = () => {
    const { logoutUser, user } = useContext(authContext)
    
    return (
        <div id="right-sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <h4 className="text-light font-weight-bold mt-4">TreeHouse</h4>
                </li>
                <li>
                    <p className="ml-3 text-light" >Bienvenido {user ? user.name : null}</p>
                </li>
                <li>
                    <button onClick={logoutUser} className="ml-3 btn btn-light" >Cerrar Sesión</button>
                </li>

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

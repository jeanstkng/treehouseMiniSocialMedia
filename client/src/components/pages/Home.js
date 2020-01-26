import React,{ useContext, useEffect, useState } from 'react'
import AuthContext from "../../context/authContext/authContext"
import SidebarLeft from "../layouts/SidebarLeft"
import SidebarRight from "../layouts/SidebarRight"

const Home = () => {
    const {getUser} = useContext(AuthContext)
    const [leftToggled, setToggled] = useState(false)
    const [rightToggled, setToggled2] = useState(false)
    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    },[])

    return (
        <div id="wrapper" className={`${leftToggled ? " left-toggled " : ""} 
                                      ${rightToggled ? " right-toggled " : ""}`} >
            
            <SidebarLeft/>
            <SidebarRight/>

            <a onClick={() => setToggled(!leftToggled)} className="btn btn-link btn-md" id="left-menu-toggle">AA<span className="glyphicon glyphicon-chevron-left"></span></a>
            <a onClick={() => setToggled2(!rightToggled)} className="btn btn-link btn-md" id="right-menu-toggle">AA<span className="glyphicon glyphicon-chevron-right"></span></a>

        </div>
    )
}

export default Home

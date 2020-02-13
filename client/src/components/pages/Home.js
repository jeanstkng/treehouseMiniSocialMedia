import React,{ useContext, useEffect, useState } from 'react'
import AuthContext from "../../context/authContext/authContext"
import SidebarLeft from "../layouts/SidebarLeft"
import SidebarRight from "../layouts/SidebarRight"
import HomePosts from '../posts/HomePosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
    const {getUser, getUsers} = useContext(AuthContext)
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

            <HomePosts />

            <a onClick={() => setToggled(!leftToggled)} className="btn btn-link btn-md position-fixed" id="left-menu-toggle">
                <span>{!leftToggled ? <FontAwesomeIcon icon="arrow-alt-circle-left" /> : <FontAwesomeIcon icon="arrow-alt-circle-right" /> }</span>
            </a>
            <a onClick={() => setToggled2(!rightToggled)} className="btn btn-link btn-md position-fixed" id="right-menu-toggle">
                <span>{!rightToggled ? <FontAwesomeIcon icon="arrow-alt-circle-right" /> : <FontAwesomeIcon icon="arrow-alt-circle-left" />}</span>
            </a>

        </div>
    )
}

export default Home

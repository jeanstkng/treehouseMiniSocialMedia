import React,{ useContext, useEffect } from 'react'
import AuthContext from "../../context/authContext/authContext"
import SidebarLeft from "../layouts/SidebarLeft"
import SidebarRight from "../layouts/SidebarRight"

const Home = () => {
    const {getUser} = useContext(AuthContext)
    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    },[])
    let leftToggled = true
    let rightToggled = true
    const onToggleLeft = e =>{
        e.preventDefault()
        if (leftToggled) {
            leftToggled = false
        } else {
            leftToggled = true
        }
    }
    const onToggleRight = e =>{
        e.preventDefault()
        if (rightToggled) {
            rightToggled = false
        } else {
            rightToggled = true
        }
    }
    return (
        <div id="wrapper" className={( leftToggled ? null : ' left-toggled ') + ( rightToggled ? null : ' right-toggled ')}>
            <SidebarLeft/>
            <SidebarRight/>

            <a onClick={onToggleLeft} className="btn btn-link btn-md" id="left-menu-toggle">AA<span className="glyphicon glyphicon-chevron-left"></span></a>
            <a onClick={onToggleRight} className="btn btn-link btn-md" id="right-menu-toggle">AA<span className="glyphicon glyphicon-chevron-right"></span></a>

        </div>
    )
}

export default Home

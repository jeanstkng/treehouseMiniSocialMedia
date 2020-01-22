import React from 'react'

const SidebarLeft = () => {
    return (
        <div id="left-sidebar-wrapper">
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <a href="#">
                    Left Sidebar
                </a>
            </li>
            <li>
                <a data-toggle="collapse" href="#dashboard" aria-expanded="false">Dashboard <span className="caret"></span></a>
                <div className="collapse sub-bar" id="dashboard">
                    <a href="#">Dashboard Sub 1</a>
                    <a data-toggle="collapse" href="#dashboard-sub-2" aria-expanded="false">Dashboard Sub 2 <span className="caret"></span></a>
                    <div className="collapse sub-bar" id="dashboard-sub-2">
                        <a href="#">Dashboard Sub Sub 1</a>
                        <a data-toggle="collapse" href="#dashboard-sub-sub-2" aria-expanded="false">Dashboard Sub Sub 2 <span className="caret"></span></a>
                        <div className="collapse sub-bar" id="dashboard-sub-sub-2">
                            <a href="#">Dashboard Sub Sub Sub 1</a>
                            <a href="#">Dashboard Sub Sub Sub 2</a>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a data-toggle="collapse" href="#shortcuts" aria-expanded="false">Shortcuts <span className="caret"></span></a>
                <div className="collapse sub-bar" id="shortcuts"> 
                    <a data-toggle="collapse" href="#shortcuts-sub-1" aria-expanded="false">Shortcuts Sub 1 <span className="caret"></span></a>
                    <div className="collapse sub-bar" id="shortcuts-sub-1">
                        <a href="#">Shortcuts Sub Sub 1</a>
                        <a href="#">Shortcuts Sub Sub 2</a>
                    </div>
                    <a href="#">Shortcuts Sub 2</a>
                </div>
            </li>
            <li>
                <a href="#">Overview</a>
            </li>
            <li>
                <a href="#">Events</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Services</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </div>
       
    )
}

export default SidebarLeft

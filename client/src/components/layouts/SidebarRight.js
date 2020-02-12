import React from 'react'

const SidebarRight = () => {
    return (
        <div id="right-sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a >TreeHouse</a>
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

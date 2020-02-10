import React from 'react'

const SidebarRight = () => {
    return (
        <div id="right-sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a >Right Sidebar</a>
                </li>

                <li>
                    <a data-toggle="collapse" aria-expanded="false">Recent Search <span className="caret"></span></a>
                    <div className="collapse in sub-bar" id="recent-search">
                        <a >Keyword 1</a>
                        <a >Keyword 2</a>
                        <a >Keyword 3</a>
                        <a >Keyword 4</a>
                    </div>
                </li>
            </ul>
        </div>
  )
}

export default SidebarRight

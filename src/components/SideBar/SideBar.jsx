import React from "react";
import './SideBar.css';

import { Link } from "react-router-dom";

function SideBar(){

    return (
        <React.Fragment>
            <div className="sidebar">
                <Link to='/newBusiness' className='sidebar-link'> Agregar Negocio</Link>
                <hr></hr>
            </div>    
        </React.Fragment>
    );
}

export default SideBar;
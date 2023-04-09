import React from "react";
import './SideBar.css';
import { Link } from "react-router-dom";

function SideBar(){


    return (
        <React.Fragment>
            <div className="sidebar">

                <hr className="sidebar-separator"></hr>
                <Link to = "/" className="link" id="businesses">Inicio</Link>
                <hr className="sidebar-separator"></hr>
                <Link to = "/new-business" className="link" id="new-business">Nuevo Negocio</Link>
                <hr className="sidebar-separator"></hr>
                <Link to = "/general-view" className="link" id="general-view">Vista General</Link>
                <hr className="sidebar-separator"></hr>
            </div>    
        </React.Fragment>
    );
}

export default SideBar;
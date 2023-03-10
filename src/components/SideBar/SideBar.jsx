import React from "react";
import './SideBar.css';
import changeViewOnClick from "../../js files/changeViewOnClick";
import { Link } from "react-router-dom";

function SideBar(){


    return (
        <React.Fragment>
            <div className="sidebar">

                <hr className="sidebar-separator"></hr>
                <Link to = '/' className="link" onClick ={changeViewOnClick}id="businesses">Inicio</Link>
                <hr className="sidebar-separator"></hr>
                <Link to = '/' className="link" onClick ={changeViewOnClick}id="new-business">Nuevo Negocio</Link>
                <hr className="sidebar-separator"></hr>
                <Link to = '/' className="link" onClick ={changeViewOnClick}id="general-view">Vista General</Link>
                <hr className="sidebar-separator"></hr>
            </div>    
        </React.Fragment>
    );
}

export default SideBar;
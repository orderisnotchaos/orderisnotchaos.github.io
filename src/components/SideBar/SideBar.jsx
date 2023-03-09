import React from "react";
import './SideBar.css';
import changeViewOnClick from "../../js files/changeViewOnClick";

function SideBar(){


    return (
        <React.Fragment>
            <div className="sidebar">

                <hr className="sidebar-separator"></hr>
                <div className="link" onClick={changeViewOnClick} id="businesses">Inicio</div>
                <hr className="sidebar-separator"></hr>
                <div className="link" onClick={changeViewOnClick} id="new-business">Nuevo Negocio</div>
                <hr className="sidebar-separator"></hr>
                <div className="link" onClick={changeViewOnClick} id="general-view">Vista general</div>
                <hr className="sidebar-separator"></hr>
            </div>    
        </React.Fragment>
    );
}

export default SideBar;
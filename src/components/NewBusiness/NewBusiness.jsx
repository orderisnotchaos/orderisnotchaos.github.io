import React from "react";

import ThemeContext from "../../contexts/themeContext";
import { Navigate } from "react-router-dom";
import validateBusinessName from "../../js files/validateBusinessName";
import "./NewBusiness.css";
import validateCUIL from "../../js files/validateCUIL";
export default function NewBusiness(props){

    const themeContext = React.useContext(ThemeContext);

    function handleClick(){
        let name=document.querySelector("#new-business-input-1").value;
        let CUIL = document.getElementById("new-business-input-2").value;

        if(validateBusinessName(name) && validateCUIL(CUIL)){


            fetch(themeContext.APIURL+'newBusiness',{
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": `${themeContext.token}` },
                mode:'cors',
                body:JSON.stringify({name}),
            }).then(res =>{
                    return res.json();
                    }).then((res)=>{
                        if(res.ok === true){
                            props.setBusinesses(res.data);
                            document.querySelector("#new-business-component").style.display = "none";
                            document.querySelector("#businesses-component").style.display = "block";
                        }else{
                            themeContext.setToken(null);
                            <Navigate to="/login" replace={true} />
                        }
                    }).catch((em) =>{
                        console.error(em);
                    });
        }else{
            if(validateCUIL(CUIL)){
                document.getElementById("new-business-name-error").style.display = "block";
            }else{
                document.getElementById("new-business-cuil-error").style.display = "block";
                document.getElementById("new-business-name-error").style.display = "block";
            }
        }

    }

    return(
        <div id="new-business-component" className="new-business-wrapper">  

            <div className="new-business-form-container">
                <h3 className="new-business-h3">
                    Nuevo negocio
                </h3>
                <div id="new-business-input-data-div" className="new-business-input-data-div">
                    <ul className="new-business-data-ul">
                        <li className="new-business-flex-li">
                            <label className="new-business-label"> nombre: </label>
                            <input id="new-business-input-1" className="new-business-input" ></input>
                            <p id ="new-business-name-error" className="new-business-error">debe ingresar un nombre</p>
                        </li>
                        <li className="new-business-flex-li">
                            <label className="new-business-label"> CUIL: </label>
                            <input id="new-business-input-2" className="new-business-input" ></input>
                            <p id="new-business-cuil-error" className="new-business-error"> debe ingresar un CUIL válido</p>
                        </li>
                    </ul>
                    
                </div>
                <div className="new-business-submit-button-container">
                    <button onClick={handleClick} className="new-business-submit-button"><label className="submit-button-label">crear</label></button>
                </div>
            </div>
        </div>
    );
}
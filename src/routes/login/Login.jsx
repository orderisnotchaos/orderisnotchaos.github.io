import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import ThemeContext from '../../contexts.js';
import "./Login.css";


function Login(){

    const themeContext = React.useContext(ThemeContext);

    const handleChange = (event) => {

        if(event.target.name === "username"){
            
            themeContext['setUserName'](event.target.value);

        }

        if(event.target.name === "password"){
            
            themeContext['setPassword'](event.target.value);

        }

        if(event.key === 'Enter'){
            handleSubmit();
        }
    };

    useEffect(() =>{

        document.onkeyup = handleChange;
    })

    function handleSubmit(){
        console.log(themeContext);

        let userName = themeContext['userName'] === undefined ? '' : themeContext['userName'];
        let password = themeContext['password'] === undefined ? '': themeContext['password'];
        if(password !== '' && userName !== ''){
            fetch('http://127.0.0.1:8000/',{
        
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                mode:'cors',
                body: JSON.stringify({userName, password})
            }).then((res) =>{

                return res.json();
            }).then(res => {
                if(res['message'] === `don't loose your token!`){
                    themeContext['setToken'](res['token']);
                }else{
                    themeContext['setErrors'](res['message']);
                }
            });
        }else{
            themeContext['setErrors'](`credentials can't be empty`);
            
        }

    }

    if(themeContext['token']) return <Navigate to='/' replace={true}/>;
    if(!themeContext['errors']){
        return(
            <React.Fragment>
                <div className="login-box">
                    <div className="userCredentials-title">
                        <div className="login-title">
                            <p>Ingreso</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="login-form-container">

                            <label htmlFor="username" className="full-space-label-name">Usuario/mail:</label>
                            <input type="text" name="username"className="centered-input" id="username" onChange={handleChange}></input>
                            <label htmlFor="password" className="full-space-label-password">Contraseña:</label>
                            <input type="password" name="password" className="centered-input" id= "password" onChange={handleChange}></input>
        
                            <button type="submit" className="login-button" onClick={handleSubmit}> ingresar </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
            <div className="login-box">
                <div className="userCredentials-title">
                    <div className="login-title">
                        <p>Ingreso</p>
                    </div>
                </div>
                <hr></hr>
                <div className="login-form-container">

                    <label htmlFor="username" className="full-space-label">Nombre de usuario:</label>
                    <input type="text" name="username"className="centered-input" id="username" onChange={handleChange}></input>

                    <label htmlFor="password" className="full-space-label">Contraseña:</label>
                    <input type="password" name="password" className="centered-input" id= "password" onChange={handleChange}></input>
                    <p className="red">{themeContext['errors']}</p>
                    <button type="submit" className="login-button" onClick={handleSubmit}> ingresar </button>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Login;
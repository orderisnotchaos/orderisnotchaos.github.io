import React from "react";

import PropTypes from 'prop-types';
import "./Login.css";

function Login({setters, getters}){

    const handleChange = (event) => {

        if(event.target.name === "username"){
            setters.setUserName(event.target.value);

        }

        if(event.target.name === "password"){
            setters.setPassword(event.target.value);

        }
    };

    function handleSubmit(){
       console.log(getters.userName, getters.password);
        let userName = getters['userName'] === undefined ? '' : getters.userName;
        let password = getters['password'] === undefined ? '': getters.password;
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
                    setters.setToken(res['token']);
                }else{
                    setters.setErrors(res['message']);
                }
            });
        }else{
            setters.setErrors(`password/username can't be empty`);
            
        }

    }
    if(!getters.errors){
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
                        <p className="red">{getters.errors}</p>
                        <button type="submit" className="login-button" onClick={handleSubmit}> ingresar </button>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    setters: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,

  }

export default Login;
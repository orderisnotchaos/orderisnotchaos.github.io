import React from "react";

import "./UserCredentials.css";

function UserCredentials(){

    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
  const handleChange = (event) => {

    if(event.target.name === "username"){
        setUserName(event.target.value);

    }

    if(event.target.name === "password"){
        setPassword(event.target.value);

    }
  };

    function handleClick(){
            console.log('entro');
            fetch('http://127.0.0.1:8000/',{
    
            method: 'POST',
            mode:'cors',
            body: JSON.stringify({userName, password})
        }).then((res) =>{

            return res.json();
        }).then(res =>{
            console.log(res)
            console.log(JSON.stringify({userName, password}));
        });
    }

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
    
                        <button type="submit" className="login-button" 
                            onClick={handleClick}> ingresar </button>
                </div>
            </div>
        </React.Fragment>
    )
        ;
}



export default UserCredentials;
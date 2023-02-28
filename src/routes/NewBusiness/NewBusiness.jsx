import React from "react";

import ThemeContext from "../../contexts";


export default function NewBusiness(){

    const themeContext = React.useContext(ThemeContext);

    const [bData, setBData] = React.useState({});

    function handleChange(event){
        if(event.target.name === 'name'){
            setBData({name: event.target.value});
        }

    }
    function handleSubmit(){

        fetch('http://localhost:8000/newBusiness',{
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": themeContext.token },
            mode:'cors',
            body:{bData}
        })


    }
    return(
        <>
            <label>name:</label>
            <input type="text" name="name" className="" onChange={handleChange}>Crear</input>
            <button onSubmit={handleSubmit} />
        </>
    );
}
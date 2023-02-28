import React from "react";
import { Navigate } from "react-router-dom";

import './Main.css';
import NavBar from "../../components/NavBar/NavBar";

import SideBar from "../../components/SideBar/SideBar";
import ThemeContext from "../../contexts";
import Business from "../../components/Business/Business";
function Main (){

    const themeContext = React.useContext(ThemeContext);
    const [wasInvalid, setWasInvalid] =React.useState(false);
    const [content, setContent] = React.useState([]);

    let token =themeContext.token; 
    async function apiCall(token, content, setContent){
    if(token !== null || token !== undefined || token !== ''){
        
        if(content === null ){

            
            fetch('http://127.0.0.1:8000/',{
                method:'GET',
                headers: { "Content-Type": "application/json", 'Authorization':token},
                mode:'cors',
            }).then((res) =>{
                return res.json();
            }).then((res) =>{
                if(res['tokenVerification'] === 'NOK'){
                    themeContext.setToken(null);
                    setWasInvalid(true);
                }

                if(res['tokenVerification'] === 'OK'){
                    console.log("----");
                    setContent({bAvatar: '404.jpg', bName:'admin-finance'});
                } 
            }).catch((em) =>{
                console.error(em);
            });
        }
    }
}
    console.log(content);
    if(wasInvalid === true){
        setWasInvalid(false);
        return <Navigate to='/expired' replace={true} />;
    }
    if(themeContext.token === undefined || themeContext.token === null || themeContext.token === ''){

        return (<Navigate to='/login' replace={true}/>);
     }
    return (
        <React.Fragment>
            <NavBar />
            <div className='main-content'>
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <Business data={content}></Business>
                    
                     
                </div>
            </div>
        </React.Fragment>
    );

}

export default Main;
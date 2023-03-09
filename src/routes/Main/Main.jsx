import React from "react";
import { Navigate } from "react-router-dom";

import './Main.css';
import NavBar from "../../components/NavBar/NavBar";
import MaxBusinessReached from "../../components/MaxBusinessReached/MaxBusinessReached";
import SideBar from "../../components/SideBar/SideBar";
import ThemeContext from "../../contexts/themeContext";
import Business from "../../components/Business/Business";
import NewBusiness from "../../components/NewBusiness/NewBusiness";
import NewBusinessServerError from "../../components/ServiceUnavailable/ServiceUnavailable.jsx";
import GeneralView from "../../components/GralView/GeneralView";
import BusinessDetails from "../../components/BusinessDetails/BusinessDetails";
import WelcomeComponent from "../../components/WelcomeComponent/WelcomeView";
function Main(){

    const themeContext = React.useContext(ThemeContext);
    const [wasInvalid, setWasInvalid] =React.useState(false);
    const [businesses, setBusinesses] = React.useState([]);
    React.useEffect(()=>{

        if(themeContext.token !== undefined){
        
            fetch(themeContext.APIURL,{
                method:'GET',
                headers: { "Content-Type": "application/json", 'Authorization':themeContext.token},
                mode:'cors',
                }).then((res) =>{ 
                    return res.json();
                }).then((res) =>{
                    if(res.ok === false){
                        themeContext.setToken(null);
                        setWasInvalid(true);
                    }

                    if(res.ok === true){

                        setBusinesses(res.data);

                    } 
                }).catch((em) =>{
                    console.error(em);
                });
        }

    },[themeContext]);

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
                <SideBar />
                <div className='main-content'>

                    <div id="content-wrapper" className="content-wrapper">
                        <div id="businesses-component" className="businesses-container"> 
                            {businesses[0] !== undefined ?businesses.map((business, i)=>{

                                return (<Business data={business} businessesLength={businesses.length}key= {i}/>);
                            }): <WelcomeComponent />}
                        </div>
                        <NewBusiness setBusinesses={setBusinesses} />
                        <NewBusinessServerError />
                        <GeneralView data = {businesses}/>
                        <MaxBusinessReached></MaxBusinessReached>

                        <div id="businesses-details-component" className="businesses-details">
                            {businesses[0]!== undefined ?businesses.map((business,i) =>{
                                return (<BusinessDetails data={business} setBusinesses={setBusinesses} key={i}></BusinessDetails>)
                            }):<></>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ); 
}

export default Main;
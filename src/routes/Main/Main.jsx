import React from "react";
import { useNavigate } from "react-router-dom";

import './Main.css';
import NavBar from "../../components/NavBar/NavBar";
import MaxBusinessReached from "../../components/MaxBusinessReached/MaxBusinessReached";
import SideBar from "../../components/SideBar/SideBar";
import ThemeContext from "../../contexts/themeContext";
import Business from "../../components/Business/Business";
import NewBusinessServerError from "../../components/ServiceUnavailable/ServiceUnavailable.jsx";
import WelcomeComponent from "../../components/WelcomeComponent/WelcomeView";
function Main(){

    const themeContext = React.useContext(ThemeContext);
    const navigate = useNavigate();
    React.useEffect(()=>{

        if(!themeContext.token || !themeContext.businesses) navigate('/login');
        
    },[themeContext,navigate]);

    console.log(themeContext.businesses);
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <div className='main-content'>

                    <div id="content-wrapper" className="content-wrapper">
                        <div id="businesses-component" className="businesses-container"> 
                            {themeContext.businesses.length !== 0 ?themeContext.businesses.map((business, i)=>{

                                return (<Business {...business} businessesLength={themeContext.businesses.length} key= {i}/>);
                            }): <WelcomeComponent />}
                        </div>
                        <NewBusinessServerError />
                        <MaxBusinessReached></MaxBusinessReached>
                    </div>
                </div>
            </React.Fragment>
        ); 
}

export default Main;
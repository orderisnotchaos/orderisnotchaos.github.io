import React from "react";

import Sales from '../Sales/Sales';
import './Business.css';
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../contexts/themeContext";



export default function Business(props){

    const themeContext = React.useContext(ThemeContext);
    
    const navigate = useNavigate();

    function handleClick(){
        themeContext.setBName(props.name);
        navigate(`/${themeContext.userName}/${props.name}`);
    }

    return (
        <>  
           
            <div id={`${props.name}-component`} className="business">

                <h3 className="bName" id={`${props.name}`} onClick={handleClick}>{`${props.name}`}</h3>

                <div className="bData">
                    <h4 className="last-sales">Ultimas ventas</h4>
                    <div className='sales-title'>
                        <p id='ticket-p' className='sales-title-p'><label className="ticket-label">nombre</label></p>
                        <p id='valor-p' className='sales-title-p'>valor</p>
                        <p id='date-p' className='sales-title-p'><label className="date-label">fecha</label></p>
                    </div>
                    <div className="business-product-sales-container">
                        <Sales data={{sales:props.Sales.slice(0,9)}} key = {props}/>
                    </div>
                </div>
            </div>
        </>
    );

}
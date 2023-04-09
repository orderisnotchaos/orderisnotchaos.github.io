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
    console.log(props);
    return (
        <>  
           
            <div id={`${props.name}-component`} className="business">

                <h3 className="bName" id={`${props.name}`} onClick={handleClick}>{`${props.name}`}</h3>

                <div className="bData">
                    <h4 className="last-sales">Ultimas ventas</h4>
                    <div className='sales-title'>
                        <p className='sales-title-p'>nombre</p>
                        <p className='sales-title-p'>cantidad</p>
                        <p className='sales-title-p'>precio unitario</p>
                        <p className='sales-title-p'>valor total</p>
                        <p className='sales-title-p'>fecha</p>
                    </div>
                    <div className="business-product-sales-container">
                        <Sales data={{sales:props.Sales}} key = {props}/>
                    </div>
                </div>
            </div>
        </>
    );

}
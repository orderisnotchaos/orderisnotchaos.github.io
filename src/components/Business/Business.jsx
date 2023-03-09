import React from "react";

import changeViewOnClick from "../../js files/changeViewOnClick";

import Sales from '../Sales/Sales';
import './Business.css';



export default function Business(props){
    
    return (
        <>  
           
            <div id={`${props.data.name}-component`} className="business">
                {//<img className="bImage" src={imgPath/props.data.bAvatar} alt={`${props.data.bName}'s avatar`}></img>
                } 
                <h3 className="bName" id={`${props.data.name}`} onClick={changeViewOnClick}>{`${props.data.name}`}</h3>

                <div className="bData">
                    <h4 className="last-sales">Ultimas ventas</h4>
                    <div className='sales-title'>
                            <p className='sales-title-column'>nombre</p>
                            <p className='sales-title-column'>cantidad</p>
                            <p className='sales-title-column'>precio</p>
                            <p className='sales-title-column'>fecha</p>
                        </div>
                    <div className="business-product-sales-container">
                        <Sales data={{sales:props.data.Sales}} key = {props.data}/>
                    </div>
                </div>
            </div>
        </>
    );

}
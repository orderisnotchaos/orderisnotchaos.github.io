import React from "react";
import { Link } from "react-router-dom";

import './Business.css';



export default function Business(props){
    console.log(props);
    let imgPath ='../../assets/images/';
    return (
        <>  
           
                <div className="bContent-wrapper">
                    {//<img className="bImage" src={imgPath/props.data.bAvatar} alt={`${props.data.bName}'s avatar`}></img>
                    } 

                    <Link to={`${props}`} className="clean-link">
                        <h3 className="bName"> ADMIN-FINANCE</h3>
                    </Link>
                    <div className="bData">
                    <p className="bDescription">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi aut
                        repellat deserunt sint eveniet rem cum accusamus, earum repellendus nam, 
                        recusandae, praesentium quae. Nostrum magnam alias aspernatur nisi cumque architecto?
                    </p>
                    <p className="bProfit"> $0.00 </p>
                    </div>

                </div>
        </>
    );

}
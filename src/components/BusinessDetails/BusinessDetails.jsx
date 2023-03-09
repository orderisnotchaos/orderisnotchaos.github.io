import {useContext} from "react";
import './BusinessDetails.css';
import ThemeContext from '../../contexts/themeContext.js';

export default function BusinessDetails(props){

    const themeContext = useContext(ThemeContext);

    const soldItemValues = {value:0,
                            name: "",
                            quantity:0,
                            time:0};

    function handleClick(){
        if(props.data !== undefined){

            for(let i=0; i<3; i++){
                    soldItemValues[document.getElementById(`${props.data.name}-input-${(i+1)}`).name]=document.getElementById(`${props.data.name}-input-${(i+1)}`).value;
            }
            soldItemValues['time']= Date.now();
            if(soldItemValues.name === '' || (soldItemValues.quantity === 0 || soldItemValues.quantity === '') || (soldItemValues.value === 0 || soldItemValues.value === '')){
                document.getElementById('new-sold-item-error').style.display="block";

                return;
            }
            fetch(themeContext.APIURL+'newSale',{
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": `${themeContext.token}` },
                mode:'cors',
                body:JSON.stringify({soldItemValues,bId:props.data.id}),
            }).then(res =>{
                return res.json();
            }).then(res =>{
                if(res.ok === true){

                    props.setBusinesses(res.data);

                }else{

                    document.getElementById(`${props.data.name}-details-component`).style.display='none';
                    document.getElementById("service-unavailable-component").style.display="block";
                    return;
                }
            }).catch(e =>{
                console.error(e);
            });
            return;
        }
    }
    if(props.data !== undefined){
        return(
            <div id={`${props.data.name}-details-component`} className="business-details">
                
                <div className="products-card">

                    <h3 className="title">productos</h3>
                    <div className="products-container">
                        {props.data.Products !== undefined ? props.data.Products.map(product=>{
                            return <p className="product-text">{product.name}</p>
                        }):<></>}
                    </div>
                </div>
                <div className="last-tickets-generated">
                    <h5 className="title">últimas facturas generadas</h5>
                </div>
                <div className="add-sold-item">
                    <h3 className="add-sold-item-title">nueva venta</h3>
                    <div className="form-container">
                        <div className="new-sale-component">
                            <label>producto:</label>
                            <input id={`${props.data.name}-input-1`} className="new-sale-input" name="name" type="text"></input>
                        </div>

                        
                        <div className="new-sale-component">
                            <label>cantidad:</label>
                            <input id={`${props.data.name}-input-2`} className="new-sale-input" name="quantity" type="text"></input>
                        </div>

                        <div className="new-sale-component">
                            <label>precio:</label>
                            <input id={`${props.data.name}-input-3`} className="new-sale-input" name = "value" type="text"></input>
                        </div>
                        <div className="button-container">
                            <button id = {`${props.data.name}-button`} onClick={handleClick} className="add-sold-item-button"> 
                                <p className="button-text">
                                    agregar
                                </p>
                            </button> 
                        </div>
                        <p id="new-sold-item-error" className="new-sold-item-error">los campos no deben estar vacíos</p>
                    </div>
                </div>
            </div>
        );
    }

    return <></>

}
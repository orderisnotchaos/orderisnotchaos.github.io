import {useContext} from "react";
import './BusinessDetails.css';
import ThemeContext from '../../contexts/themeContext.js';
import Product from "../../components/Product/Product.jsx";
import Ticket from "../../components/Ticket/Ticket.jsx";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar.jsx";
import { useNavigate } from "react-router-dom";
export default function BusinessDetails(){

    const themeContext = useContext(ThemeContext);
    const navigate = useNavigate();
    let business;
    for(let i = 0; i<themeContext.businesses.length;i++){
        if(themeContext.businesses[i].name === themeContext.bName) business = themeContext.businesses[i];
    }

    const soldItemValues = {value:0,
                            name: "",
                            quantity:0,
                            time:0};
    
    let inputOneUserInputTextLength = document.getElementById(`${business.name}-input-1`) ? document.getElementById(`${business.name}-input-1`).value.length : 0;
    let inputOneSuggestionLength = 0;

    function suggestProduct(input, productList) {
            const suggestion = productList.find(product => product.toLowerCase().slice(0, input.length) === input.toLowerCase());
            return suggestion || null;
        }

    function isTextKey(key){
        if(key !== 'Enter' && key !== 'Tab' && key !== 'Alt' && key !== 'Control' && 
           key !== 'ArrowLeft' && key !== 'ArrowRight' && key !=='ArrowDown' &&
           key !== 'ArrowUp' && key !== 'Shift' && key !== 'CapsLock' && key !== 'Meta' &&
           key !== 'Escape' && key !== 'Home' &&
           key !== 'End' && key !== 'PageUp' && key !== 'PageDown' && 
           key !== 'Insert' && key !== 'ContextMenu' &&
           key !== 'NumLock' && key !== 'ScrollLock' &&
           key !=='End'){
            return true;
           }

        return false
    }
    function handleKeyPress(e){

        if(inputOneUserInputTextLength === 0 || e.target.value.length === 0){
            if(e.key === 'Tab'){
                e.preventDefault();
                e.target.value = suggestProduct(e.target.value, business.Products.map(product=>product.name));
                inputOneSuggestionLength = e.target.value.length;
                e.target.selectionStart = e.target.value.length;

                inputOneUserInputTextLength+=1;
            }else{
                inputOneUserInputTextLength+=1;
            }
        }else{

            if(isTextKey(e.key)){
                if(e.key!== 'Backspace' && e.key!== 'Delete'){
                    inputOneUserInputTextLength += 1;
                }else{
                    if(e.key !== 'Delete'){
                        inputOneUserInputTextLength-=1;
                    }else{

                    }
                }
            }
        }


        if(e.key === 'Tab'){

            if(e.target.selectionStart !== e.target.value.length){
                e.preventDefault();
                inputOneUserInputTextLength=e.target.value.length;
                e.target.setSelectionRange(inputOneSuggestionLength,inputOneSuggestionLength, 'forward');
            }

        }
        if(e.keyCode === 13){
            handleSubmitReq();
        }
    }

    function handleKeyRelease(e){
        let productSuggestion;
        productSuggestion = suggestProduct(e.target.value, business.Products.map(product=>product.name))
                          ? suggestProduct(e.target.value, business.Products.map(product=>product.name))
                          : null;
        if(isTextKey(e.key) && e.key !== 'Backspace' && e.key !== 'Delete'){
            if(productSuggestion !== null){

                e.target.value = productSuggestion;
                inputOneSuggestionLength = productSuggestion.length;
            }
        }

        if(e.key !== 'Tab'){
            if(inputOneUserInputTextLength < inputOneSuggestionLength){
                e.target.setSelectionRange(inputOneUserInputTextLength, inputOneSuggestionLength,'backward');
            }
        }else{
            
        }
    }

    function handleSubmitReq(){
        if(business !== undefined){

            for(let i=0; i<3; i++){
                    soldItemValues[document.getElementById(`${business.name}-input-${(i+1)}`).name]=document.getElementById(`${business.name}-input-${(i+1)}`).value;
            }
            soldItemValues['time']= Date.now();
            if(soldItemValues.name === '' || (soldItemValues.quantity === 0 || soldItemValues.quantity === '') || (soldItemValues.value === 0 || soldItemValues.value === '')){
                document.getElementById('new-sold-item-error').style.display="block";

                return;
            }
            fetch(themeContext.APIURL+'user/business/newSale',{
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": themeContext.token },
                mode:'cors',
                body:JSON.stringify({soldItemValues,bId:business.id}),
            }).then(res =>{
                return res.json();
            }).then(res =>{
                if(res.ok === true){

                    themeContext.setBusinesses(res.data);

                }else{

                    document.getElementById(`${business.name}-details-component`).style.display='none';
                    document.getElementById("service-unavailable-component").style.display="block";
                    return;
                }
            }).catch(e =>{
                console.error(e);
            });
            return;
        }
    }

    function handleAddProductsButtonClick(){

        document.getElementById('addProductWindow').style.display = 'block';
    }

    function handleAddProductButtonClick(){
        const data = {name : document.getElementById('productName').value,
                      price : document.getElementById('productPrice').value}
        if(data.name && data.price){
            fetch(themeContext.APIURL+'user/business/newProduct',{
                method:'POST',
                headers: { "Content-Type": "application/json", "Authorization": themeContext.token },
                mode:'cors',
                body: JSON.stringify({...data,bId:business.id})
            }).then(res=>{
                return res.json();
            }).then(res =>{
                if(res.ok){
                    themeContext.setBusinesses(res.data);
                    document.getElementById('newProductError1').style.display = 'none';
                    document.getElementById('newProductError2').style.display = 'none';
                }else{
                    if(res.message === 'product already exists') document.getElementById('newProductError2').style.display = 'block';
                }
                
            }).catch(err =>{console.log(err)})
        }else{
            document.getElementById('newProductError1').style.display = 'block';
        }
    }

    function handleAddProductGoBack(){
        document.getElementById('addProductWindow').style.display = 'none';
    }
    
    if(business !== undefined){
        if(document.getElementById(`${business.name}-input-1`)){
            document.getElementById(`${business.name}-input-1`).placeholder = suggestProduct('', business.Products.map(product=>product.name))
                                                                                ? suggestProduct('', business.Products.map(product=>product.name)) : '';
        }
        return(
            <>
                <NavBar />
                <SideBar />

                <body id = "addProductWindow" className="add-product-window">
                    <div className="new-product-card">
                    
                        <h3 className="new-product-title"><button onClick={handleAddProductGoBack} className="new-product-exit-button">x</button>nuevo producto</h3>
                        <div className="new-product-input-container">
                            <label className="new-product-label">nombre:</label>
                            <div className="new-product-input-container2">
                                <input id="productName" type="text" className="new-product-input"></input>
                            </div>
                        </div>
                        <div className="new-product-input-container">
                            <label className="new-product-label">precio:</label>
                            <div className="new-product-input-container2">
                                <input id="productPrice" type="text" className="new-product-input"></input>
                            </div>
                        </div>
                        <p id="newProductError1" className="error-paragraph">debe llenar todos los campos</p>
                        <p id="newProductError2" className="error-paragraph">el producto ya existe</p>
                        <button onClick={handleAddProductButtonClick}> agregar</button>
                    </div>

                </body>
                <div id={`${business.name}-details-component`} className="business-details">
                    
                    <div className="products-card">

                        <h3 className="title">productos</h3>
                        <div className="details-container">
                            <p className="detail">nombre</p>
                            <p className="detail">precio</p>
                            <p className="detail">ingresos</p>
                            <p className="detail">ventas</p>
                        </div>
                        <div className="products-container">
                            {business.Products !== undefined ? business.Products.map(product=>{
                                return <Product product={product}/>
                            }):<></>}
                            
                        </div>
                        <button className="add-products-button" onClick={handleAddProductsButtonClick}>agregar</button>
                    </div>
                    <div className="last-tickets-generated">
                        <h5 className="title">últimas facturas generadas</h5>
                        <div className="tickets-container">
                            {business.Sales !== undefined ? business.Sales.map(sale=>{
                                return <Ticket ticket={sale.ticketName}/>
                            }):<></>}
                        </div>
                    </div>
                    <div className="add-sold-item">
                        <h3 className="add-sold-item-title">nueva venta</h3>
                        <div className="form-container">
                            <div className="new-sale-component">
                                <label>producto:</label>
                                <input id={`${business.name}-input-1`} className="new-sale-input"  autoComplete = "off" onKeyDown={handleKeyPress} onKeyUp={handleKeyRelease} name="name" type="text "></input>
                            </div>

                            <div className="new-sale-component">
                                <label>cantidad:</label>
                                <input id={`${business.name}-input-2`} className="new-sale-input" name="quantity" type="text"></input>
                            </div>

                            <div className="new-sale-component">
                                <label>precio:</label>
                                <input id={`${business.name}-input-3`} className="new-sale-input" onKeyDown={handleKeyPress} name = "value" type="text"></input>
                            </div>

                            <div className="button-container">
                                <button id = {`${business.name}-button`} onClick={handleSubmitReq} className="add-sold-item-button"> 
                                    <p className="button-text">
                                        agregar
                                    </p>
                                </button> 
                            </div>
                        </div>
                        <p id="new-sold-item-error" className="new-sold-item-error">los campos no pueden estar vacíos</p>
                    </div>
                </div>
            </>
        );
    }

    return <></>

}
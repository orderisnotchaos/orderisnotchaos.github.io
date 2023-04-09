

import './Product.css';
export default function Product(props){
    console.log(props);
    return(
        <>
        <div className="product-container">

            <div className="product-name">
                <p className="product-name-p">{props.product.name}</p>
            </div>

            <div className="product-price">
                <p className="product-p">${props.product.business_product.price}</p>
            </div>

            <div className="product-earnings">
                <p className="product-profit-p">${props.product.business_product.profit}</p>
            </div>

            <div className = "product-quantity-sold">
                <p className="product-sold-quantity-p">{props.product.business_product.sold}</p>
            </div>
        </div>
        </>
    );
}
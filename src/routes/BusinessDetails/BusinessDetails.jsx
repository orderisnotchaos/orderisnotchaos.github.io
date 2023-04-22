
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import './BusinessDetails.css';


export default function BusinessDetails(props){

    console.log(props);
    const color = ['red','lightyellow','lightblue','blue','orangered','orange','yellowgreen','yellow','green'];
    const productProfits = props.business.Products.map((product) =>{

        return product.business_product.profit;
    })
    let totalProfit = 0;

    productProfits.forEach(productProfit => totalProfit+=productProfit);
    return(
        <>
            <NavBar />
            <SideBar />
            <div className='business-details-container'>

                <div className='business-details-pie-chart-container'>

                </div>
                <div className='business-details-pie-chart-labels-container'>
                    <h4 className='business-details-h4'>productos</h4>
                    <ul className='business-details-pie-chart-labels-ul'>
                        {props.business.Products.map((product,i) =>{
                            return <li className='business-details-pie-chart-li' key={i}><div className={`business-details-pie-chart-color-div ${color[i]}`}></div><label>{product.name}:</label></li>;
                        })}
                    </ul>
                    <ul className='business-details-pie-chart-prices-ul'>
                        {props.business.Products.map((product,i) =>{
                            return <li className='business-details-pie-chart-li' key={i}><label className='price-label'>${product.business_product.profit}</label></li>;
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

import './Sale.css';

export default function Sale(props){
    function transformDateFormat(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      }

    return(
            <div className='sale-container'>
                <label className='sold-name'><p className='sale-name'>{props.data.ticketName}</p></label>
                <label className='sold-total-price'><p className='sale-price'>${props.data.value}</p></label>
                <time className='sold-product-time'><p className='time'>{transformDateFormat(props.data.time)}</p></time>
            </div>
    );
}
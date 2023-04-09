
import {Link, useNavigate} from 'react-router-dom';
import './Subscription.css';
export default function Subscription(props){

    const navigate = useNavigate();
    function handleClick(){
        navigate(`/${props.userName}/subscripcion`)
    }
    if(props.sub){
        return (
            <>
                <label className='active-sub-label'>activa</label>
                <div className="sub-paragraph"> tarjeta:**********{props.sub}</div>
                <div className='cancel-sub-div'>
                    <Link to={`/${props.userName}/subscripcion`}>
                        <div className='red-div'></div>
                    </Link>
                </div>
            </>
        )
    }

    return (
            <>
                <label className='inactive-sub-label'>inactiva</label>
                <button className='activate-sub-button' onClick={handleClick}>activar</button>
            </>
    );
}
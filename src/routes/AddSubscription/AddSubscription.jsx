
import { useNavigate } from 'react-router-dom';
import './AddSubscription.css';
import { useContext } from 'react';
import ThemeContext from '../../contexts/themeContext';
export default function AddSubscription(){

    const themeContext = useContext(ThemeContext);
    const navigate = useNavigate();
    function handleClick(){
        if(themeContext.subscriptionState){
            themeContext.setSubscriptionState();
            return navigate(`/${themeContext['userName']}/cuenta`);
        }
        themeContext.setSubscriptionState(1111);
        navigate(`/${themeContext['userName']}/cuenta`);
    }
    return(
        <>
        <button className='Button' onClick={handleClick}> Volver </button>
        </>
    )
}


import ThemeContext from '../../../../contexts/themeContext';
import React from 'react';
import Subscription from '../Subscription/Subscription';
import './SubscriptionState.css';

export default function SubscriptionState(){

    const themeContext = React.useContext(ThemeContext);

    return (
        <>
            
            <div className='subscription-state-container'>
                <h1 className='account-title'>Subscripción</h1>
                <p className='subscription-state-paragraph'>estado:</p>
                <Subscription sub = {themeContext['subscriptionState']} userName = {themeContext['userName']}/>
            </div>
        </>
    );
}
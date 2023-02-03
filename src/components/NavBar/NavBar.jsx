import React from 'react';

import './NavBar.css';

import ThemeContext from '../../contexts.js';

import foto from '../../assets/images/404.jpg';

import logo from '../../assets/images/logo.jpg';
function NavBar(){

    const themeContext = React.useContext(ThemeContext);

    return (
        <React.Fragment>
            <nav className='navbar'>

                <ul className='navbar-nav'>
                    <li className='logo-container'>
                        
                        <img className='logo' src={logo} alt='admin finance'></img>
                        <p className='logo-text'>admin finance</p>
                    </li>
                    <li className='separator'>

                    </li>
                    <li className='user-ham-menu'>
                            <img className='img-profile' src={foto} id={2} alt = {`${themeContext['userName']}'s avatar`} />
                            <ul className='user-options'>

                                <li className='user-options-li'>
                                    cuenta
                                </li>

                                <li className='user-options-li'>
                                    configuración
                                </li>
                            </ul>
                    </li>

                </ul>

            </nav>
        </React.Fragment>
    );


}

export default NavBar;
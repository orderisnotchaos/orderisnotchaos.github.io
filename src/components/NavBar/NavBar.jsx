import React from 'react';

import './NavBar.css';

import ThemeContext from '../../contexts/themeContext.js';

import {Link} from 'react-router-dom';
import foto from '../../assets/images/avatar.jpg';

import logo from '../../assets/images/logo.jpg';
function NavBar(){

    const themeContext = React.useContext(ThemeContext);

    return (
        <React.Fragment>
            <nav className='navbar'>

                <ul className='navbar-nav'>
                    <li className='logo-container'>
                        <Link to='/' className='navBar-logo-link'>
                            <img className='logo' src={logo} alt='admin finance'></img>
                            <p className='logo-text'>admin finance</p>
                        </Link>
                    </li>
                    <li className='separator'>

                    </li>
                    <li className='right-content'>
                        <div className='user-ham-menu'> 
                            <img className = 'img-profile' src={foto} id={2} alt = {`${themeContext['userName']}'s avatar`} />
                            <ul  className = 'user-options'>

                                <li className='user-options-li'>
                                    <Link to={`/${themeContext['userName']}/cuenta`} className='ham-menu-link'>
                                        cuenta
                                    </Link>
                                </li>

                                <li className='user-options-last-li'>
                                    <Link to='/configuration' className='ham-menu-link'>
                                        configuración
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>

            </nav>
        </React.Fragment>
    );


}

export default NavBar;
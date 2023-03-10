
import './Account.css';
import ThemeContext from '../../contexts/themeContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import validateDocument from '../../js files/validateDocument';
export default function Configuration(){
  
    const themeContext = useContext(ThemeContext);
    

    function handleClick(e){
        let userData = {name:themeContext['userName'], email:themeContext['uMail'],dType:themeContext['dType'],dNumber:themeContext['dNumber'],password: themeContext['password']};
        switch(e.target.id){
            case 'user-config-button-1':
                userData.name = document.getElementById('new-user-name-input').value;
                fetch(themeContext.APIURL+'user/update', {
                    method:'POST',
                    headers:{'Content-Type':'application/json','authorization': themeContext.token},
                    body: JSON.stringify(userData)
                })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.ok === true){
                            themeContext.setUserName(document.getElementById('new-user-name-input').value);
                            <Navigate to='/' replace={true}/>
                        }
                    });
                break;

            case 'user-config-button-2':
                userData.email = document.getElementById('new-e-mail-input').value;
                fetch(themeContext.APIURL+'user/update', {
                    method:'POST',
                    headers:{'Content-Type':'application/json', 'authorization': themeContext.token},
                    body: JSON.stringify(userData)
                })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.ok === true){
                            themeContext.setUMail(document.getElementById('new-e-mail-input').value);
                            <Navigate to='/' replace={true}/>
                        }
                    });
                break;

            case 'user-config-button-3':
                if(document.getElementById('new-password-input').value === document.getElementById('confirm-new-password-input').value
                &&
                document.getElementById('old-password-input')=== themeContext.userPassword){
                    userData.password = document.getElementById('new-password-input').value;
                    fetch(themeContext.APIURL+'user/update', {
                        method:'POST',
                        headers:{'Content-Type':'application/json', 'authorization': themeContext.token},
                        body: JSON.stringify(userData)
                    })
                        .then(res=>res.json())
                        .then(data=>{
                            if(data.ok === true){
                                themeContext.setUserName(document.getElementById('confirm-new-password-input').value);
                                <Navigate to='/' replace={true}/>
                            }
                    });
                }else{
                    if(document.getElementById('new-password-input').value !== document.getElementById('confirm-new-password-input').value){
                        document.getElementById('new-passwords-dont-match').style.display = 'block';
                    }else{
                        document.getElementById('old-password-doesnt-match').style.display = 'block';
                    }
                }
                break;
            
            case 'user-config-button-4':
                if(validateDocument(document.getElementById('new-document-input').value)){
                    userData.dNumber = document.getElementById('new-document-input').value;
                    fetch(themeContext.APIURL+'user/update', {
                        method:'POST',
                        headers:{'Content-Type':'application/json', 'authorization': themeContext.token},
                        body: JSON.stringify(userData)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.ok === true){
                            themeContext.setDNumber(document.getElementById('new-document-input').value);
                            themeContext.setDType(document.getElementById('account-uDType').value);
                            <Navigate to={'/'} replace={true}/>
                        }else{
                            
                        }
                    });
                }
                break;
            default:
                break;
            }
    }
    return (
        <>
            <NavBar />
            <SideBar />
            <div id='configuration-component' className='configuration-container'>
                <h1 className='configuration-title'>Detalles de la cuenta</h1>
                <div className='configuration-content'>
                    <div className='configuration-content-item'>
                        <div className='user-name-config'>
                            <h2 className='config-h2'>Nombre de usuario</h2>

                            <div className='user-name-input-container'>
                            <p className='config-p'><label className='config-label'>Nombre actual:</label><strong>{themeContext.userName}</strong></p>
                                <label className='config-label'>Nuevo nombre:</label>
                                <input id="new-user-name-input"className='config-input' type='text' placeholder='nuevo nombre'></input>
                            </div>
                            <div className='config-button-container'>
                                <button id='user-config-button-1' className='config-button' onClick={handleClick}>Guardar</button>
                            </div>
                        </div>
                        <div className='config-container'>
                            <h2 className='config-h2'>Email</h2>
                            <div className='email-input-container'>
                                <p className='config-p'><label className='config-label'>Email actual:</label><strong>{themeContext.uMail}</strong></p>
                                <label className='config-label'>Nuevo email:</label>
                                <input id="new-e-mail-input"className='config-input' type='text' placeholder='Nuevo e-mail'></input>
                            </div>
                            <div className='config-button-container'>
                                <button id='user-config-button-2' className='config-button' onClick={handleClick}>Guardar</button>
                            </div>
                        </div>
                        <div className='config-container'>
                            <h2 className='config-h2'>Contraseña</h2>
                            <div className='passwords-container'>
                                <div className='old-password-input-container'>
                                    <label className='config-label'>Contraseña actual:</label>
                                    <input id='old-password-input' className='config-input' type='password' placeholder={themeContext['password']}></input>
                                    <p id='old-password-doesnt-match' className='config-error'>la contraseña antigua no es válida</p>
                                </div>
                                <div className='new-password-input-container'>
                                    <label className='config-label'> Nueva contraseña:</label>
                                    <input id='new-password-input' className='config-input' type='password' placeholder='Nueva contraseña'></input>
                                </div>
                                <div className='confirm-new-password-input-container'>
                                    <label className='config-label'>Confirmar contraseña:</label>
                                    <input id='confirm-new-password-input' className='config-input' type='password' placeholder='Confirmar nueva ...'></input>
                                </div>
                                <p id='new-passwords-doesnt-match' className='config-error'>la nueva contraseña no coincide</p>
                            </div>
                            <div className='config-button-container'>
                                <button id='user-config-button-3'className='config-button' onClick={handleClick}>Guardar</button>
                            </div>
                        </div>

                        <div className='config-container'>
                            <h2 className='config-h2'>Documento</h2>
                            <div className='email-input-container'>
                                <p className='config-p'><label className='config-label'>Documento actual:</label><strong>{themeContext.dType}</strong>:<strong>{themeContext.dNumber}</strong></p>
                                <label className='document-config-label'>Nuevo documento:</label>
                                <select id="account-uDType" name='tipo de documento' className='account-select'>
                                    <option value="DNI">DNI</option>
                                    <option value="LC/LE" className='new-user-select-option'>LC/LE</option>
                                </select>
                                <input id="new-document-input"className='config-input' type='text' placeholder='nuevo número de ...'></input>
                            </div>
                            <div className='config-button-container'>
                                <button id='user-config-button-4' className='config-button' onClick={handleClick}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import ThemeContext from '../../contexts/themeContext';
import './NewUser.css';
export default function NewUser(){

    const themeContext = useContext(ThemeContext);
    const [userCreationSucces, setUserCreationSuccess] = useState(false);

    function handleSubmitReq(){
        let userData = {
            uName:'',
            uMail:'',
            uDType:'DNI',
            uDocNumber:0,
            uPassword:''
        }
        let userValues = ['uName','uMail','uDType','uDocNumber','uPassword'];
        for(let i=0;i<5;i++){
            let data = document.getElementById(userValues[i]);
            if(userValues[i] === 'uDType'){
                if(data.value !== '0'){
                    userData[userValues[i]] = data.value;
                }
            }else{
                if(data.value !== '' && data.value !== null && data.value !== undefined){
                    userData[userValues[i]] = data.value;
                }
            }
        }
        fetch(themeContext.APIURL+'newUser',{
        
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            mode:'cors',
            body: JSON.stringify({...userData})
        }).then(res =>{

            if(res.ok === true){

                setUserCreationSuccess(true);
            }
        }).catch(e =>{
            console.error(e);
        })
    }

    if(userCreationSucces){
        document.querySelector('.new-user-view-container').style.display = 'none';
        document.querySelector('.user-creation-success').style.display = 'flex';
    }
    return (
        <>
            <div className="new-user-view-container">
                <div className="new-user-form-container">
                    <h3 className='new-user-title'>nuevo usuario</h3>
                    <div className='new-user-inputs-container'>
                        <div className='input'>
                            <label className='new-user-label'><p className='new-user-p'>nombre de usuario:</p></label>
                            <div className='new-user-input-container'>
                                <input id="uName" className="new-user-input" />
                            </div>
                        </div>
                        <div className='input'>
                            <label className='new-user-label'><p className='new-user-p'>correo electrónico:</p></label>
                            <div className='new-user-input-container'>
                                <input id="uMail" type='email' className="new-user-input" />
                            </div>
                        </div>
                        <div className='input'>
                            <div className='select-container'>
                                <select id="uDType" name='tipo de documento' className='new-user-select'>
                                    <option value = '0' className='select-option-0'>tipo de documento &#x2228;</option>
                                    <option value="DNI">DNI</option>
                                    <option value="LC/LE" className='new-user-select-option'>LC/LE</option>
                                </select>
                                
                            </div>
                            <div className='new-user-input-container'>
                                <input id="uDocNumber" type='text' className="new-user-input" />
                            </div>
                        </div>
                        <div className='input'>
                            <label className='new-user-label'><p className='new-user-p'>contraseña:</p></label>
                            <div className='new-user-input-container'>
                                <input id="uPassword" type="password" className="new-user-input" />
                            </div>
                        </div>
                    </div>
                    <div className='new-user-submit-button-container'>
                        <button className='new-user-submit-button' onClick={handleSubmitReq}>crear</button>
                    </div>
                </div>
            </div>

            <div className='user-creation-success'>
                <div className='user-creation-success-text-container'>
                <h3 className='user-creation-success-title'> ¡Usuario creado con éxito!</h3>
                <Link to='/login' className='user-creation-success-link'>click aquí para ir al login...</Link>
                </div>
            </div>
        </>
    );
}
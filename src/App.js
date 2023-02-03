import React from 'react';
import Login from './routes/login/Login.jsx';
import './App.css';

import ThemeContext from './contexts.js';

import Main from './routes/Main/Main.jsx';
function App() {

  let mainRender;
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState();
  const [errors, setErrors] = React.useState();

  if(!token){
    mainRender = <Login />
  }else{
    mainRender = <Main />
  }
  return (
    <div className="App">
      <ThemeContext.Provider value = {{userName, token, setUserName, password, setPassword, setToken, errors, setErrors}}>
        
        {mainRender}
      </ThemeContext.Provider >
    </div>
  );
}

export default App;

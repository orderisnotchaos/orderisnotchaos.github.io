import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ThemeContext from './contexts/themeContext.js';
import Main from './routes/Main/Main.jsx';
import Login from './routes/Login/Login.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import ServerOffline from './routes/ServerOffline/ServerOffline.jsx';
import NewUser from './routes/NewUser/NewUser.jsx';
import Account from './routes/Account/Account.jsx';
import AccountConfiguration from './routes/Configuration/Configuration.jsx';

function App() {
  const APIURL = 'http://127.0.0.1:8000/';
  const [userName, setUserName] = React.useState('');
  const [uMail, setUMail] = React.useState(''); 
  const [dType, setDType] = React.useState('');
  const [dNumber, setDNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(); 
  const [errors, setErrors] = React.useState();
  const varSetters = {setUserName, setUMail, setDType, setDNumber, setPassword, setToken, setErrors};
  const varGetters = {userName, uMail, dType, dNumber, password, token, errors};

  React.useEffect(() => {
    
  },[token]);
  return (
    <div className="App">
      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path= '/login' element= {<Login />} />
            <Route path= '/createUser' element={<NewUser />} />
            <Route path='/serverOffline' element={<ServerOffline />} />
            <Route path='/configuration' element={<AccountConfiguration />} />
            <Route path='/account' element={<Account />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

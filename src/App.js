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
import AccountConfiguration from './routes/AccountConfiguration/AccountConfiguration.jsx';

function App() {
  const APIURL = 'http://127.0.0.1:8000/';
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState();
  const [errors, setErrors] = React.useState();
  const varSetters = {setUserName, setPassword, setToken, setErrors};
  const varGetters = {userName, password, token, errors};

  return (
    <div className="App">
      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path= '/login' element= {<Login />} />
            <Route path= '/createUser' element={<NewUser />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/serverOffline' element={<ServerOffline />} />
            <Route path='/account-configuration' element={<AccountConfiguration />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

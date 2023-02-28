import React from 'react';
import Login from './routes/Login/Login.jsx';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ThemeContext from './contexts.js';
import Main from './routes/Main/Main.jsx';
import Expired from './routes/Expired/Expired.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import NewBusiness from './routes/NewBusiness/NewBusiness.jsx';
function App() {

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState();
  const [errors, setErrors] = React.useState();

  const setters = {setUserName, setPassword, setToken, setErrors};
  const getters = {userName, password, token, errors};

  return (
    <div className="App">
      <ThemeContext.Provider value= {{...setters,  ...getters}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/newBusiness' element={<NewBusiness />} />
            <Route path='/expired' element={<Expired />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

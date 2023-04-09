import React from 'react';
import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import ThemeContext from './contexts/themeContext.js';
import Main from './routes/Main/Main.jsx';
import Login from './routes/Login/Login.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import ServerOffline from './routes/ServerOffline/ServerOffline.jsx';
import NewUser from './routes/NewUser/NewUser.jsx';
import Account from './routes/Account/Account.jsx';
import GeneralView from './routes/GeneralView/GeneralView.jsx';
import AccountConfiguration from './routes/Configuration/Configuration.jsx';
import NewBusiness from './routes/NewBusiness/NewBusiness';
import BusinessDetails from './routes/BusinessDetails/BusinessDetails';
import AddSubscription from './routes/AddSubscription/AddSubscription';

function App() {
  const APIURL = 'http://127.0.0.1:8000/';
  const [userName, setUserName] = React.useState('');
  const [mail, setMail] = React.useState(''); 
  const [dType, setDType] = React.useState('');
  const [businesses, setBusinesses] = React.useState([]);
  const [bName, setBName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState(1141957202);
  const [subscriptionState, setSubscriptionState] = React.useState();
  const [dNumber, setDNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(); 
  const [errors, setErrors] = React.useState();
  const varSetters = {setUserName, setMail, setDType, setDNumber, setPassword, setToken, setErrors, setBName, setBusinesses, setSubscriptionState, setPhoneNumber};
  const varGetters = {userName, mail, dType, dNumber, password, token, errors, bName, businesses, subscriptionState,phoneNumber };

  return (
    <div className="App">
      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path = '/general-view' element={<GeneralView />} />
            <Route path ='/new-business' element={<NewBusiness />} />
            <Route path = {`/${userName}/${bName}`} element ={<BusinessDetails />} />
            <Route path = {`/${userName}/subscripcion`} element = {<AddSubscription />} />
            <Route path= '/login' element= {<Login />} />
            <Route path= '/createUser' element={<NewUser />} />
            <Route path='/serverOffline' element={<ServerOffline />} />
            <Route path='/configuration' element={<AccountConfiguration />} />
            <Route path={`${userName}/cuenta`} element={<Account />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

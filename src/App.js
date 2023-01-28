import React from 'react';
import Login from './components/login/Login.jsx';
import logo from './logo.svg';
import './App.css';

function App() {

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState();
  const [errors, setErrors] = React.useState([]);

  const setters = {setUserName,setPassword,setToken,setErrors};
  const getters = {userName,password,token,errors};
  if(!token) {
    return <Login setters ={setters} getters ={getters}/>
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

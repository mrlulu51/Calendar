import React, { useState } from 'react';
import EcoleDirecteAPI from './apis/ecoledirecte'

import LoginForm from './components/LoginForm';

function App() {
  const [ user, setUser ] = useState({ username: '', password: '' });
  const [ error, setError ] = useState("");

  const Login = details => {
    
    console.log(details)
  }
  
  return (
    <div className="App">
      {(user.username != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.username}</span></h2>
          <button>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;

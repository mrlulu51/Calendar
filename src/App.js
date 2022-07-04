import React, { useState } from 'react';
import { Session } from 'ecoledirecte.js';

import LoginForm from './components/LoginForm';

function App() {
  const [ user, setUser ] = useState({ username: '', password: '' });
  const [ error, setError ] = useState("");

  async function Login(details) {
    const session = new Session(details.username, details.password)
    const account = await session.login().catch(err => {
      console.error("This login not working.")
    })
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

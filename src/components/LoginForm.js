import React, { useState } from 'react';
import './loginForm.css';

function LoginForm({ Login, error }) {
    const [ details, setDetails ] = useState({ username: '', password: '' });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    return (
        <div className="center">
            <h1>Login</h1>
            <form id="login" onSubmit={submitHandler}>
                <div className="text_field">
                    <input type="text" name="username" id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={ details.username } />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className="text_field">
                    <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={ details.password } />
                    <span></span>
                    <label>Password</label>
                </div>
                <input type="submit" value="Login" />
                <div className="pronote">
                    Are you on Pronote? <a href="#">Login with Pronote</a>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

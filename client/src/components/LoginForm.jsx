import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/api-helper';

const LoginForm = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const data = { username: username, password: password };
      const currentUser = await loginUser(data);
      props.setUser(currentUser);
    }
    catch (err) {
      setErrorMessage(`Error ${err.response.status} - Invalid credentials`);
    }
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username, password);
      }} >
        <label>Username</label>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <Link to="/register">Register</Link>
      <br />
      <p>{errorMessage}</p>
    </>
  )
}

export default LoginForm;
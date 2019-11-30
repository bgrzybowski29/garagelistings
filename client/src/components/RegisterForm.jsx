import React, { useState } from 'react';
import { registerUser } from '../services/api-helper';

const RegisterForm = (props) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (username, email, password) => {
    try {
      const data = { username: username, email: email, password: password };
      const currentUser = await registerUser(data);
      props.setUser(currentUser.username);
    }
    catch (err) {
      setErrorMessage(`Error ${err.response.status} - Invalid credentials`);
    }
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleRegister(username, email, password);
      }} >
        <label>Username</label>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        <label>Email</label>
        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button>Register</button>
      </form>
      <br />
      <p>{errorMessage}</p>
    </>
  )
}

export default RegisterForm;
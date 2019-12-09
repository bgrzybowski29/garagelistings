import React, { useState } from 'react';
import { changePassword } from '../services/api-helper';

const ChangePasswordForm = (props) => {

  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async (username, password) => {
    try {
      const data = { username: username, current_password: currentPassword, new_password: newPassword };
      const currentUser = await changePassword(data);
      window.alert("Password Changed!");
      props.setUser(currentUser);
    }
    catch (err) {
      setErrorMessage(`Error ${err} - Invalid credentials`);
    }
  }

  return (
    <>
      <form className="form-login" onSubmit={(e) => {
        e.preventDefault();
        handleChangePassword(username, currentPassword, newPassword);
      }} >
        <h1><span className="log-in">Change Password</span></h1>
        <p className="float">
          <label for="login">Username</label>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        </p>
        <p className="float">
          <label for="password">Current Password</label>
          <input type='password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Current Password" className="showpassword" />
        </p>
        <p className="float">
          <label for="password">New Password</label>
          <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" className="showpassword" />
        </p>
        <p className="clearfix">
          <input id="change-password" type="submit" name="submit" value="Change Password" />
        </p>
      </form>
      <br />
      <p>{errorMessage}</p>
    </>
  )
}

export default ChangePasswordForm;
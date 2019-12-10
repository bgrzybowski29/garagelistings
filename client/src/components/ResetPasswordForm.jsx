import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { resetPassword } from '../services/api-helper';

function ResetPasswordForm(props) {

  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async (password) => {
    try {
      const data = { user: { password: newPassword } };
      const resp = await resetPassword(props.resetToken, data);
      window.alert(resp);
      props.history.push("/login");
    }
    catch (err) {
      setErrorMessage(`Error ${err} - Invalid credentials`);
    }
  }

  return (
    <>
      <form className="form-login" onSubmit={(e) => {
        e.preventDefault();
        handleResetPassword(newPassword);
      }} >
        <h1><span className="log-in">Reset Password</span></h1>
        <p className="float">
          <label for="password">New Password</label>
          <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" className="showpassword" />
        </p>
        <p className="clearfix">
          <input id="change-password" type="submit" name="submit" value="Reset Password" />
        </p>
      </form>
      <br />
      <p>{errorMessage}</p>
    </>
  )
}
export default withRouter(ResetPasswordForm);
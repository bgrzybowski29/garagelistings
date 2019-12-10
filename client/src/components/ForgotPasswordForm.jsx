import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { resetPasswordInit } from '../services/api-helper';

function ForgotPasswordForm(props) {

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const data = { email: email };
      const resp = await resetPasswordInit(data);
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
        handleResetPassword();
      }} >
        <h1><span className="log-in">Request Password Reset</span></h1>
        <p className="float">
          <label for="email">Email</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        </p>
        <p className="clearfix">
          <input id="change-password" type="submit" name="submit" value="Request Password Reset" />
        </p>
      </form>
      <br />
      <p>{errorMessage}</p>
    </>
  )
}
export default withRouter(ForgotPasswordForm);
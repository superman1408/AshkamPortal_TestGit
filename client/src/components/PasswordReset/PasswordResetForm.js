import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";

import { resetPassword } from '../../action/auth';


const PasswordResetForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    emailToChange: '',
    passwordtoChange: '',
    confirmPasswordToCompare: '',
  });




  const handleReset = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPassword(passwordForm, code, navigate)).then(() => {
        setMessage("Password Changed, Please Login with new password...!!!");
      }).catch ((err) => {console.log("Error : ", err)});
    } catch (error) {
      // setMessage(error.response.data.error);
      setMessage("Error Occur, Please try Later...!!!");
    }
  };




  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleReset}>
        <div>
          <input
            label="Secret Code"
            placeholder="Code"
            name="secretCode"
            variant="outlined"
            onChange={(event) => setCode(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={passwordForm.emailToChange}
            onChange={(e) => setPasswordForm({...passwordForm, emailToChange: e.target.value})}
          />
          <input
          type="password"
          placeholder="Password"
          value={passwordForm.passwordtoChange}
          onChange={(e) => setPasswordForm({...passwordForm, passwordtoChange: e.target.value})}
        />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordForm.confirmPasswordToCompare}
            onChange={(e) => setPasswordForm({...passwordForm, confirmPasswordToCompare: e.target.value})}
          />
        </div>
        
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordResetForm;

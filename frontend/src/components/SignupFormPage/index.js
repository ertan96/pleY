import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameInitial, setLastNameInitial] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastNameInitial, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) {
          setErrors(data.errors);
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1 className='login-header'>Sign Up for pleY</h1>
        <h2 className='login-second-header'>Connect with great local businesses</h2>
        <h3 className='privacy'>
            By continuing, you agree to Yelp's <span className="terms-of-service">Terms of Service</span> and acknowledge Yelp's <span className='privacy-policy'>Privacy Policy.</span>
          </h3>
        <form onSubmit={handleSubmit}>
          <ul className='login-errors'>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <div>
            <label className='first-name-text'>
              <input
                type="text"
                placeholder = 'First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className='last-name-text'>
              <input
                type="text"
                placeholder =' Last Name Initial'
                value={lastNameInitial}
                onChange={(e) => setLastNameInitial(e.target.value)}
                required
              />
            </label>
          </div>
          <label className='email-text'>
            <input
              type="text"
              placeholder ='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className='password-text'>
            <br />
            <input
              type="password"
              placeholder ='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className='confirm-password-text'>
            <br />
            <input
              type="password"
              placeholder ='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" className='login-button'>Sign Up</button>
          <div className='sign-up'>
            <p>Already on Yelp? <Link to='login' className='sign-up-button'>Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
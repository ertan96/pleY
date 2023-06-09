import React, { useState, useMemo } from "react";
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

  const signupLoginPhoto = useMemo(() => [
    'https://pley1-seeds.s3.us-west-1.amazonaws.com/login-photo.png'
  ],[]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastNameInitial, password }))
        .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          setErrors(data.errors);
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  console.log(errors)

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1 className='login-header'>Sign Up for pleY</h1>
        <h2 className='login-second-header'>Connect with great local businesses</h2>
        <h3 className='privacy'>
            By continuing, you agree to Yelp's <span className="terms-of-service">Terms of Service</span> and acknowledge Yelp's <span className='privacy-policy'>Privacy Policy.</span>
          </h3>
        <form onSubmit={handleSubmit}>
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
                maxLength={1}
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
            <h2>Already on Yelp? <Link to='login' className='sign-up-button'>Log in</Link></h2>
          </div>
          <ul className="login-errors">
            {errors.flat().map((error, index) => (
              <li key={index}>
                <div>{error}</div>
              </li>
            ))}
          </ul>
        </form>
      </div>
      <div className='login-photo-container'
        style={{ backgroundImage: `url(${signupLoginPhoto[0]})`}}
        >
      </div>
    </div>
  );
}

export default SignupFormPage;
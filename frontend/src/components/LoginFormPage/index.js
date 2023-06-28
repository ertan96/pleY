import React, { useState, useMemo } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const formRef = React.useRef(null);

  const signupLoginPhoto = useMemo(() => [
    'https://pley1-seeds.s3.us-west-1.amazonaws.com/login-photo.png'
  ],[]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const handleDemoLogin = () => {
    const demoEmail = 'demo@user.io';
    const demoPassword = 'password';
    dispatch(sessionActions.login({ email: demoEmail, password: demoPassword }))
      .catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
          <h1 className='login-header'>Log in to pleY</h1>
          <h2 className='login-second-header'>New to pleY? <Link to='signup' className='sign-up-button'>Sign Up</Link></h2>
          <h3 className='privacy'>
            By continuing, you agree to Yelp's <span className="terms-of-service">Terms of Service</span> and acknowledge Yelp's <span className='privacy-policy'>Privacy Policy.</span>
          </h3>
          <form onSubmit={handleSubmit} ref={formRef}>
            <ul className='login-errors'>
                {errors.map(error => <li key={error}>{error} </li>)}
            </ul>
            <label className='email-text'>
                <input
                type="text"
                placeholder= 'Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <br/>
            <label className='password-text'>
                <input
                type="password"
                placeholder ='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <br/>
            <button className='forgot-button' >Forgot password?</button>
            <button type="submit" className='login-button'>Log In</button>
            <button type='button' className='demo-login' onClick={handleDemoLogin}>Demo Login</button>
            <div className='sign-up'>
              <h2>New to Yelp? <Link to='signup' className='sign-up-button'>Sign Up</Link></h2>
            </div>
          </form>
      </div>
      <div className='login-photo-container'
        style={{ backgroundImage: `url(${signupLoginPhoto[0]})`}}
        >
      </div>
    </div>
  );
}

export default LoginFormPage;
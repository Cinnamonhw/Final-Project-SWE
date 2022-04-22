import React from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
import { useState } from 'react';
import Home from './home';
import { useNavigate } from 'react-router-dom';
import './components.css';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function Login() {
  const navigate = useNavigate()
  const onSuccess = (res) => {

    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    document.cookie = "user_id=" + res.profileObj.googleId + "; path=/";
    navigate('/home');
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. `
    );
  };

  return (   
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{backgroundColor: 'grey', marginTop: '100px' }}
        isSignedIn={true}
      /> 
  );
  
}

export default Login;
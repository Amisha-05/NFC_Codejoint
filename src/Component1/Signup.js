import React, { useState } from 'react';
import './Signup.css';
import ayurmedic from './Images/logo.png.png'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Signup = () => {
  // make the variables here
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [username,setUsername] = useState('');
  
  const navigate = useNavigate();

  // the login function
  const logInUser = () => {
    if(email.length === 0){
      alert("Email has left Blank!");
    }
    else if(password.length === 0){
      alert("password has left Blank!");
    }
    else{
        axios.post('http://127.0.0.1:5000/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            //console.log(response.data);
            navigate("/Signup");
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    }
}

const SignInUser = () => {
if(email.length === 0){
  alert("Email has left Blank!");
}
else if(password.length === 0){
  alert("password has left Blank!");
}
else{
    axios.post('http://127.0.0.1:5000/signup', {
        username: username,
        email: email,
        password: password
    })
    .then(function (response) {
        console.log(response);
        //console.log(response.data);
        navigate("/login");   //this is /login of port3000 aka react server
    })
    .catch(function (error) {
        console.log(error, 'error');
        if (error.response.status === 401) {
            alert("Invalid credentials");
        }
    });
}
}

  return (
    <section className="section">
      <div className="container">
        <div className="row">
         
       
        <div className="col-md-6 col-image d-flex justify-content-center align-items-center">
        <img src={ayurmedic} alt="" className="custom-img" />
         
          </div>
          <div className="col-md-6 col-login d-flex justify-content-center align-items-center">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button className="btn mt-4" onClick={logInUser}>submit</button>
                        <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input type="text" name="logname" value={username} onChange={(e) => setUsername(e.target.value)} className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off" />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="email" name="logemail" value={email} onChange={(e) => setEmail(e.target.value)} className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="password" name="logpass" value={password} onChange={(e) => setPassword(e.target.value)} className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button onClick={SignInUser} className="btn mt-4">submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Signup;

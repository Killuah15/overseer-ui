import React from "react";
import { Button, Grid, Row, Col, Clearfix } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import eye_logo from './img/eye_logo.png';

let mailInput = true;

const checkLogin = () =>{
  if(!mailInput){
    return "/"
  }else{
    return "/Projects"
  }
}

const handleChange = (e) => {
  mailInput = true;
}

const login = props => {

  

  return (
    <div className="loginWrapper">
      <Grid className="Login">
        <Row className="loginInner">
          <Col md={12} mdPush={12}>
            <code>{
              <div>
            <div className="Logo"><center><img draggable="false" src={eye_logo} /></center></div>
            <div className="formHeader" id="mainHeader">Overseer</div></div>
          }</code>
          </Col>
        </Row>
        <Row className="loginInner">
          <Col md={6} mdPush={6}>
            <code>{<div className="loginInputLabel"><center><input type="text" placeholder="e-Mail"  onChange={(e)=>{handleChange(e)}}/></center> </div>}</code>
          </Col>
          <Col md={6} mdPull={6}>
            <code>{<div className="loginInputLabel"> <center><input type="password" placeholder="password" /></center></div>}</code>
          </Col>
        </Row>
        <center>
          <div className="buttonWrapper">
            <NavLink to={checkLogin()} className="" onClick={(e) => {
              console.log('Login')
            }}><center><button className="loginButton">Login</button></center></NavLink>
          </div>
          <div className="buttonWrapper">
            <NavLink to="/Register" className="" onClick={(e) => {
              console.log('Login')
            }}><center><button className="registerButton">sign up</button></center></NavLink>
          </div>
        </center>
      </Grid>
    </div>
  );
};

export default login;
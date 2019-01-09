import React from "react";
import { Button, Grid, Row, Col, Clearfix } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

const checkRegister = () =>{
  return "/"
}


const register = props => {
  
  return (
    <div className="loginWrapper">
      <Grid  className="Login">
      <Row className="loginInner">
          <Col md={12} mdPush={12}>
            <code>{<div  className="formHeader">Register</div>}</code>
          </Col>
        </Row>
        <Row className="loginInner">
          <Col md={6} mdPush={6}>
            <code>{<div className="loginInputLabel"><center>Username</center> </div>}</code>
          </Col>
          <Col md={6} mdPull={6}>
            <code>{<div className="loginInputLabel"> <center><input type="text" /></center></div>}</code>
          </Col>
        </Row>
        <Row className="loginInner">
          <Col md={6} mdPush={6}>
            <code>{<div className="loginInputLabel"><center>E-Mail</center> </div>}</code>
          </Col>
          <Col md={6} mdPull={6}>
            <code>{<div className="loginInputLabel"> <center><input type="text" /></center></div>}</code>
          </Col>
        </Row>
        <Row className="loginInner">
          <Col md={6} mdPush={6}>
            <code>{<div className="loginInputLabel"><center>Password</center> </div>}</code>
          </Col>
          <Col md={6} mdPull={6}>
            <code>{<div className="loginInputLabel"> <center><input type="password" /></center></div>}</code>
          </Col>
        </Row>
        <Row className="loginInner">
          <Col md={6} mdPush={6}>
            <code>{<div className="loginInputLabel"><center>repeat Password</center> </div>}</code>
          </Col>
          <Col md={6} mdPull={6}>
            <code>{<div className="loginInputLabel"> <center><input type="password" /></center></div>}</code>
          </Col>
        </Row>
        <center>
        <div className="buttonWrapper">
        <NavLink to={checkRegister()} className="" onClick={(e)=>{
          console.log('Login')
        }}><center><button className="acceptButton">Accept</button></center></NavLink>
        </div>
       </center>
      </Grid>
    </div>
  );
};

export default register;
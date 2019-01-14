import React from "react";
import { Button, Grid, Row, Col, Clearfix } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { Mutation, renderToStringWithData } from 'react-apollo';
import { LOGIN } from '../apollo/templates/Mutations';
import { MagicSpinner } from 'react-spinners-kit';
import ErrorMessage from '../apollo/ErrorMessage';
import eye_logo from './img/eye_logo.png';

let mailInput = true;

/* const checkLogin = () =>{
  if(!mailInput){
    return "/"
  }else{
    return "/Projects"
  }
} */


class Login extends React.Component {

  constructor(props, context){
    super(props, context)

    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange(e) {
    mailInput = true;

    this.setState({
      email: e.target.type === 'text' ? e.target.value : this.state.email,
      pw: e.target.type === 'password' ? e.target.value : this.state.pw
    })
  }

  
    render(){
  return (
    <Mutation mutation={LOGIN} onCompleted={() => this.props.history.push('/Projects')}>
        {(login, { loading, error }) => (
          <form onSubmit={e => {
            e.preventDefault()
            login({ variables: { data: { email: this.state.email, password: this.state.pw}}})
          }}>
      <div className="loginWrapper">
        <Grid className="Login">
          <Row className="loginInner">
            <Col md={12} mdPush={12}>
              <code>{
                <div>
              <div className="Logo"><center><img draggable="false" src={eye_logo} /></center></div>
              <div className="formHeader" id="mainHeader">Overseer</div></div>
            }</code>
            <center>
                <MagicSpinner size={50} color="#6cd404" loading={loading} />
                <ErrorMessage error={error} message={"Unable to Login"} />
            </center>
            </Col>
          </Row>
          <Row className="loginInner">
            <Col md={6} mdPush={6}>
              <code>{<div className="loginInputLabel"><center><input type="text" placeholder="e-Mail" value={this.state.email} onChange={(e)=>{this.handleChange(e)}}/></center> </div>}</code>
            </Col>
            <Col md={6} mdPull={6}>
              <code>{<div className="loginInputLabel"> <center><input type="password" placeholder="password" value={this.state.pw} onChange={(e)=>{this.handleChange(e)}} /></center></div>}</code>
            </Col>
          </Row>
          <center>
            <div className="buttonWrapper">
              {/* <NavLink to={checkLogin()} className="" onClick={(e) => {
                console.log('Login')
              }}></NavLink> */}<center><button type="submit" className="loginButton">Login</button></center>
            </div>
            <div className="buttonWrapper">
              <NavLink to="/Register" className="" onClick={(e) => {
                console.log('Login')
              }}><center><button className="registerButton">sign up</button></center></NavLink>
            </div>
          </center> 
        </Grid>
      </div>
    </form>
        )}
    </Mutation>
  );

};
}

export default Login;
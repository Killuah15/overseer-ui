import React from "react";
import { Button, Grid, Row, Col, Clearfix } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { MagicSpinner } from "react-spinners-kit";
import ErrorMessage from "../apollo/ErrorMessage";
import { SIGNUP } from "../apollo/templates/Mutations";

class Register extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: "",
      email: "",
      pw: "",
      pwrepeat: ""
    };
  }

  handleInputChange(e) {
    this.setState({
      username:
        e.target.id === "username" ? e.target.value : this.state.username,
      email: e.target.id === "email" ? e.target.value : this.state.email,
      pw: e.target.id === "pw" ? e.target.value : this.state.pw,
      pwrepeat:
        e.target.id === "pwrepeat" ? e.target.value : this.state.pwrepeat
    });
  }

  checkRegister = () =>
    this.state.pw !== undefined &&
    this.state.pwrepeat !== undefined &&
    this.state.pw !== null &&
    this.state.pwrepeat !== null &&
    this.state.pw.trim() !== "" &&
    this.state.pwrepeat.trim() !== "" &&
    this.state.pw.trim() === this.state.pwrepeat.trim();

  render() {
    return (
      <Mutation
        mutation={SIGNUP}
        onCompleted={() => this.props.history.push("/")}
      >
        {(register, { loading, error }) => (
          <div className="loginBackground">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (this.checkRegister()) {
                  register({
                    variables: {
                      data: {
                        email: this.state.email,
                        username: this.state.username,
                        password: this.state.pw
                      }
                    }
                  });
                }
              }}
            >
              <div className="loginWrapper">
                <Grid className="">
                  <Row>
                    <Col xs={12} md={3} />
                    <Col xs={12} md={6}>
                      <Grid className="Login">
                        <Row className="loginInner">
                          <Col xs={12} md={12}>
                            <code>
                              {<div className="formHeader">Register</div>}
                            </code>
                            <center>
                              <MagicSpinner
                                size={50}
                                color="#6cd404"
                                loading={loading}
                              />
                              <ErrorMessage
                                error={error}
                                message={"Unable to Register"}
                              />
                            </center>
                          </Col>
                        </Row>
                        <Row className="loginInner">
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  <center>Username</center>{" "}
                                </div>
                              }
                            </code>
                          </Col>
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  {" "}
                                  <center>
                                    <input
                                      id="username"
                                      type="text"
                                      value={this.state.username}
                                      onChange={e => this.handleInputChange(e)}
                                    />
                                  </center>
                                </div>
                              }
                            </code>
                          </Col>
                        </Row>
                        <Row className="loginInner">
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  <center>E-Mail</center>{" "}
                                </div>
                              }
                            </code>
                          </Col>
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  {" "}
                                  <center>
                                    <input
                                      id="email"
                                      type="text"
                                      value={this.state.email}
                                      onChange={e => this.handleInputChange(e)}
                                    />
                                  </center>
                                </div>
                              }
                            </code>
                          </Col>
                        </Row>
                        <Row className="loginInner">
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  <center>Password</center>{" "}
                                </div>
                              }
                            </code>
                          </Col>
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  {" "}
                                  <center>
                                    <input
                                      id="pw"
                                      type="password"
                                      value={this.state.pw}
                                      onChange={e => this.handleInputChange(e)}
                                    />
                                  </center>
                                </div>
                              }
                            </code>
                          </Col>
                        </Row>
                        <Row className="loginInner">
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  <center>repeat Password</center>{" "}
                                </div>
                              }
                            </code>
                          </Col>
                          <Col xs={12} md={6}>
                            <code>
                              {
                                <div className="loginInputLabel">
                                  {" "}
                                  <center>
                                    <input
                                      id="pwrepeat"
                                      type="password"
                                      value={this.state.pwrepeat}
                                      onChange={e => this.handleInputChange(e)}
                                    />
                                  </center>
                                </div>
                              }
                            </code>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={12}>
                            <code>
                              {
                                <center>
                                  <div className="buttonWrapper">
                                    {/* <NavLink to={checkRegister()} className="" onClick={(e)=>{
                      console.log('Login')
                    }}> */}
                                    <center>
                                      <button className="acceptButton">
                                        Accept
                                      </button>
                                    </center>
                                    {/* </NavLink> */}
                                  </div>
                                </center>
                              }
                            </code>
                          </Col>
                        </Row>
                      </Grid>
                    </Col>
                    <Col xs={12} md={3} />
                  </Row>
                </Grid>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;

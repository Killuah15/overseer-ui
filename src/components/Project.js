import React, { Component } from "react";
import { Button, Grid, Row, Col, Clearfix } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { renderToStringWithData } from "react-apollo";

class Project extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteProject: props.deleteProject,
      name: props.name,
      type: props.type,
      rulebook: props.rulebook,
      projectID: props.projectID
    };
  }

  render() {
    return (
      <div>
        <div className="Project">
          <Grid>
            <Row>
              <Col md={9}>
                {" "}
                <Link
                  to={{
                    pathname: "/Events",
                    state: {
                      projectID: this.state.projectID,
                      rulebook: this.state.rulebook
                    }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Row className="">
                    <Col md={6} mdPush={6}>
                      <code>
                        {
                          <center>
                            <div className="ProjectName">
                              <h4>{this.state.name}</h4>
                            </div>
                          </center>
                        }
                      </code>
                    </Col>

                    <Col md={6} mdPull={6}>
                      <code>
                        {
                          <center>
                            <div className="ProjectType">
                              <h4>{this.state.type}</h4>
                            </div>
                          </center>
                        }
                      </code>
                    </Col>
                  </Row>
                </Link>
              </Col>
              <Col md={2}>
                <button id="projectDelete" onClick={this.state.deleteProject}>
                  delete
                </button>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
export default Project;

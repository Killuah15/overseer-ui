import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Project from "./Project";
import Modal from "react-modal";
import { Grid, Row, Col } from "react-bootstrap";

class ProjectView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedOption: "Symbaroum",
      warningLabel: "",
      isActive: false,
      projects: [
        {
          name: "Sample Project",
          type: "Symbaroum"
        }
      ]
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive,
      warningLabel: ""
    });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  addProject(projects) {
    if (this.refs.projectName.value !== "") {
      this.setState(e => {
        this.toggleModal();
        projects.push({
          name: this.refs.projectName.value,
          type: this.state.selectedOption
        });
        return { projects };
      });
    } else {
      this.setState({ warningLabel: "Please type in a Project Name" });
    }
  }

  render() {
    return (
      <div>
        <div className="">
          <NavLink to="/" className="">
            <center>
              <button className="navButton">Log Out</button>
            </center>
          </NavLink>
        </div>
        <div className="ProjectView">
          <div className="formHeader">Projects</div>
          {this.state.projects.map((projects, i) => (
            <Project name={projects.name} type={projects.type} />
          ))}

          <center>
            <button onClick={this.toggleModal}>+</button>
            <Modal
              className="ProjectModal"
              overlayClassName="ProjectModalOverlay"
              isOpen={this.state.isActive}
              onRequestClose={this.toggleModal}
            >
              <button onClick={this.toggleModal}>x</button>
              <h4>New Project</h4>
              <input
                type="text"
                ref="projectName"
                placeholder="type in a project name"
              />
              <center>
                <label>{this.state.warningLabel}</label>
              </center>

              <form onSubmit={this.handleFormSubmit}>
                <Grid>
                  <Row className="">
                    <Col md={4} mdPush={4}>
                      <code>
                        {
                          <center>
                            <div className="radio">
                              <label>
                                <input
                                  className="inputRadio"
                                  type="radio"
                                  value="Symbaroum"
                                  checked={
                                    this.state.selectedOption === "Symbaroum"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Symbaroum
                              </label>
                            </div>
                          </center>
                        }
                      </code>
                    </Col>
                    <Col md={4} mdPull={4}>
                      <code>
                        {
                          <center>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Call of Cthulu"
                                  checked={
                                    this.state.selectedOption ===
                                    "Call of Cthulu"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Call of Cthulu
                              </label>
                            </div>
                          </center>
                        }
                      </code>
                    </Col>
                    <Col md={4} mdPull={4}>
                      <code>
                        {
                          <center>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Das Schwarze Auge"
                                  checked={
                                    this.state.selectedOption ===
                                    "Das Schwarze Auge"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Das Schwarze Auge
                              </label>
                            </div>
                          </center>
                        }
                      </code>
                    </Col>
                  </Row>
                </Grid>
              </form>

              <center>
                <button
                  id="createProject"
                  onClick={e => {
                    this.addProject(this.state.projects);
                  }}
                >
                  create Project
                </button>
              </center>
            </Modal>
          </center>
        </div>
      </div>
    );
  }
}

export default ProjectView;

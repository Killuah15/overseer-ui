import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Project from "./Project";
import Modal from "react-modal";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import { Query, Mutation } from "react-apollo";
import _ from "lodash";
import { MagicSpinner } from "react-spinners-kit";
import ErrorMessage from "../apollo/ErrorMessage";
import { PROJECTS } from "../apollo/templates/Queries";
import {
  CREATEPROJECT,
  LOGOUT,
  DELETEPROJECT
} from "../apollo/templates/Mutations";
import client from "../apollo/client";
import Rules from "../apollo/Rules";

class ProjectView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.rules = new Rules();

    this.state = {
      selectedOption: "Symbaroum",
      warningLabel: "",
      isActive: false,
      projectsLoading: false
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

  addProject(createProjectMutation) {
    if (this.refs.projectName.value !== "") {
      this.setState({
        projectsLoading: true
      });

      this.toggleModal();
      createProjectMutation({
        variables: {
          title: this.refs.projectName.value,
          rulebook: this.state.selectedOption
        }
      });
    } else {
      this.setState({ warningLabel: "Please type in a Project Name" });
    }

    this.setState({
      projectsLoading: false
    });
  }

  deleteProject = async id => {
    this.setState({
      projectsLoading: true
    });

    const {
      data: { deleteProject }
    } = await client.mutate({
      mutation: DELETEPROJECT,
      variables: {
        id
      },
      update: (cache, { data: { deleteProject } }) => {
        const { projects } = cache.readQuery({ query: PROJECTS });

        cache.writeQuery({
          query: PROJECTS,
          data: {
            projects: projects.filter(
              project => project.id !== deleteProject.id
            )
          }
        });
      }
    });

    console.log(deleteProject);

    this.setState({
      projectsLoading: false
    });
  };

  render() {
    return (
      <div className="">
        <div className="projectBackground" />
        <div className="projectContent">
          <Mutation
            mutation={LOGOUT}
            onCompleted={() => {
              this.props.history.push("/");
            }}
          >
            {logout => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  client.clearStore();
                  logout();
                }}
              >
                <center>
                  <button className="navButton" type="submit">
                    Log Out
                  </button>
                </center>
              </form>
            )}
          </Mutation>
        </div>
        <div className="ProjectView">
          <div className="formHeader">Projects</div>

          <center>
            <MagicSpinner
              loading={this.state.projectsLoading}
              size={50}
              color="#6cd404"
            />
          </center>

          <Query query={PROJECTS}>
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <center>
                    <MagicSpinner size={50} color="#6cd404" loading={loading} />
                  </center>
                );
              }

              if (error) {
                return (
                  <center>
                    <ErrorMessage
                      error={error}
                      message={"Unable to get Projects"}
                    />
                  </center>
                );
              }

              if (_.isEmpty(data) || data.projects.length <= 0) {
                return (
                  <center>
                    <Alert bsStyle="">
                      <p>No Projects</p>
                    </Alert>
                  </center>
                );
              } else {
                return data.projects.map((project, i) => (
                  <Project
                    name={project.title}
                    type={this.rules.getRuleTranslation(project.rulebook)}
                    key={project.id}
                    projectID={project.id}
                    rulebook={project.rulebook}
                    deleteProject={e => this.deleteProject(project.id)}
                  />
                ));
              }
            }}
          </Query>

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

              <Mutation
                mutation={CREATEPROJECT}
                update={(cache, { data: { createProject } }) => {
                  const { projects } = cache.readQuery({ query: PROJECTS });
                  cache.writeQuery({
                    query: PROJECTS,
                    data: { projects: projects.concat([createProject]) }
                  });
                }}
              >
                {createProject => (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      this.addProject(createProject);
                    }}
                  >
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
                                      value="SYMBAROUM"
                                      checked={
                                        this.state.selectedOption ===
                                        "SYMBAROUM"
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
                                      value="COC"
                                      checked={
                                        this.state.selectedOption === "COC"
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
                                      value="DSA"
                                      checked={
                                        this.state.selectedOption === "DSA"
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
                    <center>
                      <button id="createProject" type="submit">
                        create Project
                      </button>
                    </center>
                  </form>
                )}
              </Mutation>
            </Modal>
          </center>
        </div>
      </div>
    );
  }
}

export default ProjectView;

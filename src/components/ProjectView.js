import React, { Component } from 'react';
import { Button, Grid, Row, Col, Clearfix, Modal, Popover, Tooltip, OverlayTrigger } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import Project from './Project';

class ProjectView extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      projects: [
        {
          name: "Sample Project"
        }


      ]
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  addProject(projects) {


    this.setState((e) => {
      projects.push(
        {
          name: "Test"
        }
      );
      return { projects }
    })


  }

  render() {

    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;


    return (
      <div className="ProjectView">
      <div className="formHeader">Projects</div>
        {this.state.projects.map((projects, i) => (
        <Project
          name={projects.name}
        />
      ))}

        <center>
          <button onClick={(e) => {
            this.addProject(this.state.projects)
          }}>+</button>
        </center>

<div>
        <p>Click to get the full Modal experience!</p>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <h4>Popover in a modal</h4>
            <p>
              there is a{' '}
              <OverlayTrigger overlay={popover}>
                <a href="#popover">popover</a>
              </OverlayTrigger>{' '}
              here
            </p>

            <h4>Tooltips in a modal</h4>
            <p>
              there is a{' '}
              <OverlayTrigger overlay={tooltip}>
                <a href="#tooltip">tooltip</a>
              </OverlayTrigger>{' '}
              here
            </p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>        
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      </div>

      
    );
  };

}



export default ProjectView;
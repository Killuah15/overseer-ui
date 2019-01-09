import React, { Component } from 'react';
import { Button, Grid, Row, Col, Clearfix, Panel, Collapse, Well } from "react-bootstrap";

class Monster extends Component{

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }


  render() {

  
  
    return (
      <div className="Monster">
        <div>ww</div>
        <Grid>
          <Row className="MonsterStats">
            <Col md={6} mdPush={6}>
              <code>{<div className="MonsterStats">ATK</div>}</code>
            </Col>
            <Col md={6} mdPull={6}>
              <code>{<div className="MonsterStats">WP</div>}</code>
            </Col>
          </Row>
          <Row className="MonsterStats">
            <Col md={6} mdPush={6}>
              <code>{<div className="MonsterStats">ww</div>}</code>
            </Col>
            <Col md={6} mdPull={6}>
              <code>{<div className="MonsterStats">ww</div>}</code>
            </Col>
          </Row>
        </Grid>
  
        <div>
          <Button onClick={() => this.setState({ open: !this.state.open })}>
            click
          </Button>
          <Collapse in={this.state.open}>
            <div>
              <Well>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </Well>
            </div>
          </Collapse>
        </div>
  
      </div>
    );
  };

}



export default Monster;

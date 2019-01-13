import React, { Component } from "react";
import { Grid, Row, Col, Clearfix, Panel, Well } from "react-bootstrap";
import { Collapse } from "react-collapse";

class Monster extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      name: props.name,
      attack: props.attack
    };
  }

  toggleCollapse = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className="Monster">
        <div>
          <h5>{this.state.name}</h5>
        </div>
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
              <code>
                {<div className="MonsterStats">{this.state.attack}</div>}
              </code>
            </Col>
            <Col md={6} mdPull={6}>
              <code>{<div className="MonsterStats">ww</div>}</code>
            </Col>
          </Row>
        </Grid>

        <div>
          <button onClick={this.toggleCollapse}>click</button>
          <Collapse isOpened={this.state.open}>
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
  }
}

export default Monster;

import React, { Component } from "react";
import { Grid, Row, Col, Clearfix, Panel, Well } from "react-bootstrap";
import { Collapse } from "react-collapse";
import Popover from "react-simple-popover";

class Monster extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteMonster: props.deleteMonster,
      id: props.id,
      open: false,
      openAbilities: false,
      openDescription: false,
      name: props.name,
      attack: props.attack
    };
  }

  toggleAbilities = () => {
    this.setState({
      openAbilities: !this.state.openAbilities
    });
  };

  toggleDescription = () => {
    this.setState({
      openDescription: !this.state.openDescription
    });
  };

  handleClick(e) {
    this.setState({ open: !this.state.open });
  }

  handleClose(e) {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="Monster">
        <div>
          <button id="monsterDelete" onClick={this.state.deleteMonster}>
            x
          </button>
          <br />
          <h5>
            <center>{this.state.name}</center>
          </h5>
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
          <button onClick={this.toggleAbilities}>Abilities</button>
          <Collapse isOpened={this.state.openAbilities}>
            <div>
              <Well>
                <Grid>
                  <Row className="MonsterStats">
                    <Col md={12} mdPush={12}>
                      <code>
                        {
                          <div>
                            <div
                              href="#"
                              ref="bla"
                              onClick={this.handleClick.bind(this)}
                              className="MonsterAbility"
                            >
                              Walking
                            </div>

                            <Popover
                              placement="right"
                              container={this.Col}
                              target={this.refs.bla}
                              show={this.state.open}
                              onHide={this.handleClose.bind(this)}
                              hideWithOutsideClick="true"
                            >
                              <p>This is popover</p>
                            </Popover>
                          </div>
                        }
                      </code>
                    </Col>
                  </Row>
                </Grid>
              </Well>
            </div>
          </Collapse>
        </div>

        <div>
          <button onClick={this.toggleDescription}>Description</button>
          <Collapse isOpened={this.state.openDescription}>
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

import React, { Component } from "react";
import { Grid, Row, Col, Clearfix, Panel, Well } from "react-bootstrap";
import { Collapse } from "react-collapse";
import Popover from "react-simple-popover";
import Plopover from './Plopover';

class Monster extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteMonster: props.deleteMonster,
      id: props.id,
      open: false,
      openAbilities: false,
      openDescription: false,
      openStats: false,
      name: props.name,
      attack: props.attack,
      monster: props.monster,
      Conditions: props.monster.Conditions,
      attributes: props.monster.attributes,
      maxToughness: props.monster.Conditions.physical.fitness.toughness
    };
  }

  toggleStats = () => {
    this.setState({
      openStats: !this.state.openStats
    });
  };

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

  handleAbbClick(e) {}

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
          <h6>
            <center>{this.state.name}</center>
          </h6>
        </div>
        <Grid>
          <Row>
            <Col md={12}>
              <div>
                <table style={{ borderRadius: "5rem" }}>
                  <tr>
                    <td colspan="3" className="toughness">
                      <div className="MonsterStats">Toughness</div>
                    </td>

                    <td colspan="3" className="corruption">
                      <div className="MonsterStats">Corruption</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="pain">
                      <div className="MonsterStats">
                      <center>Threshold<br/></center>
                        {this.state.Conditions.physical.fitness.painThreshold}
                      </div>
                    </td>
                    <td className="toughness">
                      <div className="MonsterStats">
                      {console.log(this.state.Conditions)}
                      <center>Current<br/></center>
                        {this.state.Conditions.physical.fitness.toughness}
                      </div>
                    </td>
                    <td className="tougnessMax">
                      <div className="MonsterStats">
                      <center>Max<br/></center>
                        {this.state.maxToughness}
                      </div>
                    </td>

                    <td className="corruptionThresh">
                      <div className="MonsterStats">
                      <center>Threshold<br/></center>
                        {this.state.Conditions.spiritual.corruption.threshold}
                      </div>
                    </td>
                    <td className="corruption">
                      <div className="MonsterStats">
                      <center>Current<br/></center>
                        {this.state.Conditions.spiritual.corruption.current}
                      </div>
                    </td>
                    <td className="corruptionPerm">
                      <div className="MonsterStats">
                      <center>Permanent<br/></center>
                        {this.state.Conditions.spiritual.corruption.permanent}
                      </div>
                    </td>
                  </tr>
                  <tr />
                  <tr />
                </table>
              </div>
            </Col>
          </Row>
          <Row className="monsterCollapseButtons">
            <Col xs={4} md={4}>
              {" "}
              <button onClick={this.toggleStats}>Stats</button>
            </Col>
            <Col xs={4} md={4}>
              {" "}
              <button onClick={this.toggleAbilities}>Abilities</button>
            </Col>
            <Col xs={4} md={4}>
              {" "}
              <button onClick={this.toggleDescription}>Description</button>
            </Col>
          </Row>
          <Collapse isOpened={this.state.openStats}>
            <Row>
              <Col md={12}>
                <code>
                  {
                    <div>
                      <table>
                        <tr>
                          <td className="td1">
                            <div className="MonsterStats">Accurate</div>
                          </td>
                          <td className="td2">
                            <div className="MonsterStats">Cunning</div>
                          </td>
                          <td className="td1">
                            <div className="MonsterStats">Discreet</div>
                          </td>
                          <td className="td2">
                            <div className="MonsterStats">Persuasive</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="td1">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.accurate}
                            </div>
                          </td>
                          <td className="td2">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.cunning}
                            </div>
                          </td>
                          <td className="td1">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.discreet}
                            </div>
                          </td>
                          <td className="td2">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.persuasive}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="td2">
                            <div className="MonsterStats">Quick</div>
                          </td>
                          <td className="td1">
                            <div className="MonsterStats">Resolute</div>
                          </td>
                          <td className="td2">
                            <div className="MonsterStats">Strong</div>
                          </td>
                          <td className="td1">
                            <div className="MonsterStats">Vigilant</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="td2">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.quick}
                            </div>
                          </td>
                          <td className="td1">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.resolute}
                            </div>
                          </td>
                          <td className="td2">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.strong}
                            </div>
                          </td>
                          <td className="td1">
                            <div className="MonsterStats">
                              {this.state.monster.attributes.vigilant}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  }
                </code>{" "}
              </Col>
            </Row>
          </Collapse>
        </Grid>

        <div>
          <Collapse isOpened={this.state.openAbilities}>
            <div>
              <Well>
                <Grid>
                  <Row className="MonsterStats">
                  {
                   this.state.monster.abilities.map(ability => (
                    <Plopover
                      ability={ability}
                    />
                    ))
                  }
                  </Row>
                </Grid>
              </Well>
            </div>
          </Collapse>
        </div>

        <div>
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

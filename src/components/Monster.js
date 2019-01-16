import React, { Component } from "react";
import { Grid, Row, Col, Clearfix, Panel, Well } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { Mutation } from "react-apollo";
import { DELETECREATURE } from '../apollo/templates/Mutations';
import { CREATURES } from "../apollo/templates/Queries";

class Monster extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteMonster: props.deleteMonster,
      id: props.id,
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
        {/* <Mutation
        mutation={DELETECREATURE}
        update= {(cache, { data: { deleteCreature } }) => {
          const { creatures } = cache.readQuery({ query: CREATURES, variables: { fromRulebook: this.props.rulebook } })
          cache.writeQuery({
            query: CREATURES,
            variables: {
               fromRulebook: this.props.rulebook
            },
            data: {
              creatures: creatures.filter(creature => creature.id !== deleteCreature.id)
            }
          })
        }}
        >
        { deleteCreature => (
          <form
          onSubmit={e => {
            e.preventDefault()
            deleteCreature({ variables: { id: this.props.id }})
          }}
          >  */}     
          <button /* type='submit' */ onClick={this.state.deleteMonster}>delete</button>
          {/* </form>
        )}
        </Mutation> */}
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

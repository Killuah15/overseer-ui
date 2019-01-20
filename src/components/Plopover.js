import React, { Component } from 'react'
import { Grid, Row, Col, Clearfix, Panel, Well } from 'react-bootstrap'
import { Collapse } from 'react-collapse'
import Popover from 'react-simple-popover'

class Plopover extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleHover(e) {
    this.setState({open: !this.state.open});
  }
 
  handleClose(e) {
    this.setState({open: false});
  }

  render() {
      return(
    <Col md={12} mdPush={12}>
      <code>
        <div>
          <div
            href="#"
            ref={this.props.ability.id}
            onMouseEnter={this.handleHover.bind(this)}
            onMouseLeave={this.handleHover.bind(this)}
            onClick=""
            onMouseDown=""
            className="MonsterAbility"
          >
            {this.props.ability.title + " | " + this.props.ability.currentRank}
          </div>

          <Popover
            placement="right"
            container={this.Col}
            target={this.refs[this.props.ability.id]}
            show={this.state.open}
            onHide={this.handleClose.bind(this)}
            hideWithOutsideClick="false"
            containerStyle={{left: 200, right: 200 }}
          >
            <p>
              <b>
                {this.props.ability.description[0].rank}
                <br />
              </b>
              {this.props.ability.description[0].description}
            </p>
          </Popover>
        </div>
      </code>
    </Col>
    )
  }
}

export default Plopover

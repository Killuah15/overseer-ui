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

  renderSwitchDescriptions(ability){
    switch(ability.currentRank) {
      case 'NOVICE':
        return ability.description[0].description
        break
      
      case 'ADEPT':
        return ability.description[1].description
        break

      case 'MASTER':
        return ability.description[2].description
        break

      default:
        break
    }
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
          >
            <p>
              <b>
                {this.props.ability.currentRank}
                <br />
              </b>
              {this.renderSwitchDescriptions(this.props.ability)}
            </p>
          </Popover>
        </div>
      </code>
    </Col>
    )
  }
}

export default Plopover

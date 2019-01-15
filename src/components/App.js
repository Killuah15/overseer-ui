import React, { Component } from "react";
import "../public/styles/App.css";
import { Button, Grid, Row, Col, Clearfix, Panel, Alert } from "react-bootstrap";
import EventCard from "./EventCard";
import Trash from "./Trash";
import Monster from "./Monster";
import HTML5Backend from "react-dnd-html5-backend";
import { NavLink } from "react-router-dom";
import { DragDropContext } from "react-dnd";
import { Query } from "react-apollo";
import { MagicSpinner } from 'react-spinners-kit';
import _ from 'lodash';
import { EVENTS } from '../apollo/templates/Queries';
import ErrorMessage from '../apollo/ErrorMessage';
import client from "../apollo/client";
const update = require("immutability-helper");

var newkey = 5;

class App extends Component {
  state = {
    selectedOption: "Turtle",
    textValue: "Test",
    monsterData: ["Turtle", "Fly", "Bird", "Wolf", "Lion"],
    monsters: [],
    cards: [],
    projectID: this.props.location.state.projectID,
    currentEvent: null
  };

  async componentDidMount(){

    const cards = await client.query({
      query: EVENTS,
      variables: {
        projectID: this.state.projectID
      }
    })

    cards.data.events.forEach(element => {
      element.active = true
    });

    this.setState({
      cards: cards.data.events
    })

  }

  deleteItem = id => {
    this.setState(prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== id)
      };
    });
    console.log("deleting id:" + id);
  };

  toggleChecked(index) {

    const card = this.state.cards[index];

    this.setState(e => {
      if (card.active) {
        card.active = false;
        return { card };
      } else {
        card.active = true;
        return { card };
      }
    }); 

    console.log(card.eventRole);
  }

  showEvent(eType) {
    this.setState({
      textValue: eType
    });

    console.log(eType);
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  addCard(cards, eType) {
    console.log("new Card");
    console.log(cards);
    newkey++;

    if (this.refs.eventText.value !== "") {
      this.setState(e => {
        cards.push({
          id: cards.length + 2,
          text: this.refs.eventText.value,
          key: newkey,
          active: true,
          eventType: eType
        });
        this.refs.eventText.value = "";
        return { cards };
      });
    }
  }

  fillMonsterList() {
    let selection = [];

    for (let i = 0; i < this.state.monsterData.length; i++) {
      selection.push(<option>{this.state.monsterData[i]}</option>);
    }
    return selection;
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  addMonster(monsters) {
    newkey++;
    this.setState(e => {
      monsters.push({
        name: this.state.selectedOption,
        attack: "20",
        id: monsters.length,
        key: newkey
      });
      return { monsters };
    });
  }

  deleteMonster = id => {
    this.setState(prevState => {
      return {
        monsters: prevState.monsters.filter(monster => monster.id !== id)
      };
    });
    console.log("deleting id:" + id);
  };

  render() {
    return (
      <div className="App">
        <div className="">
          <NavLink to="/Projects" className="">
            <center>
              <button className="navButton">Projects</button>
            </center>
          </NavLink>
        </div>

        <Grid>
          <Row className="show-grid">
            <Col md={7} mdPush={7}>
              <code>
                {
                  <div className="eventInfo">
                    <h1>{this.state.textValue}</h1>
                    <br />
                    <div className="eventInfoArea">
                      {this.state.monsters.map((monsters, i) => (
                        <Monster
                          key={monsters.key}
                          name={monsters.name}
                          attack={monsters.attack}
                          deleteMonster={e => this.deleteMonster(i)}
                          id={monsters.id}
                        />
                      ))}
                    </div>

                    <select
                      value={this.state.selectedOption}
                      onChange={this.handleOptionChange}
                    >
                      {this.fillMonsterList()}
                    </select>
                    <button
                      onClick={e => {
                        this.addMonster(this.state.monsters);
                      }}
                    >
                      add
                    </button>
                  </div>
                }
              </code>
            </Col>
            <Col md={5} mdPull={5}>
              <code>
                {
                  <div>
                    <div className="Events">
                      <h1>Events</h1>
                      <br />
                        <center>
                          <div className="eventsArea" id="style-1">
                             {this.state.cards.map((event, i) => (
                               <EventCard
                                 key={event.id}
                                 index={i}
                                 id={event.id}
                                 text={event.title}
                                 item={event}
                                 active={event.active}
                                 eventType={event.eventRole}
                                 moveCard={this.moveCard}
                                 toggleChecked={e => this.toggleChecked(i)}
                                 showEvent={e => this.showEvent(event.eventRole)}
                                 handleDrop={id => this.deleteItem(id)}
                               />
                             ))}
                           </div>
                        </center>

                      <div className="Footer">
                        <Trash />

                        <input
                          ref="eventText"
                          type="text"
                          placeholder="type in new Event"
                        />
                        <br />
                        <button
                          className="createButtonDefault"
                          onClick={e => {
                            this.addCard(this.state.cards, "Default");
                          }}
                        >
                          Default
                        </button>
                        <button
                          className="createButtonCombat"
                          onClick={e => {
                            this.addCard(this.state.cards, "Combat");
                          }}
                        >
                          Combat
                        </button>
                        <button
                          className="createButtonQuest"
                          onClick={e => {
                            this.addCard(this.state.cards, "Quest");
                          }}
                        >
                          Quest
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </code>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);

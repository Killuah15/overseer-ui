import React, { Component } from "react";
import "../public/styles/App.css";
import { Button, Grid, Row, Col, Clearfix, Panel } from "react-bootstrap";
import Card from "./Card";
import Trash from "./Trash";
import Monster from "./Monster";
import HTML5Backend from "react-dnd-html5-backend";
import { NavLink } from "react-router-dom";
import { DragDropContext } from "react-dnd";
const update = require("immutability-helper");

var newkey = 5;

class App extends Component {
  state = {
    selectedOption: "Turtle",
    textValue: "Test",
    monsterData: ["Turtle", "Fly", "Bird", "Wolf", "Lion"],
    monsters: [],
    cards: [
      {
        id: 1,
        text: "This is an Event",
        key: 1,
        active: true,
        eventType: "Default"
      },
      {
        id: 2,
        text: "Wild Turtle Attacks!",
        key: 2,
        active: true,
        eventType: "Combat"
      }
    ]
  };

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

    console.log(card.eventType);
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
            <Col md={6} mdPush={6}>
              <code>
                {
                  <div className="eventInfo">
                    {this.state.textValue}
                    {this.state.monsters.map((monsters, i) => (
                      <Monster
                        key={monsters.key}
                        name={monsters.name}
                        attack={monsters.attack}
                        deleteMonster={e => this.deleteMonster(i)}
                        id={monsters.id}
                      />
                    ))}

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
            <Col md={6} mdPull={6}>
              <code>
                {
                  <div>
                    <div className="Events">
                      <h1>Events</h1>
                      <br />
                      <center>
                        <div className="eventsArea" id="style-1">
                          {this.state.cards.map((card, i) => (
                            <Card
                              key={card.key}
                              index={i}
                              id={card.id}
                              text={card.text}
                              item={card}
                              active={card.active}
                              eventType={card.eventType}
                              moveCard={this.moveCard}
                              toggleChecked={e => this.toggleChecked(i)}
                              showEvent={e => this.showEvent(card.eventType)}
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

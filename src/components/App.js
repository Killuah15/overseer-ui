import React, { Component } from "react";
import "../public/styles/App.css";
import { Button, Grid, Row, Col, Clearfix, Panel, Alert } from "react-bootstrap";
import EventCard from "./EventCard";
import Trash from "./Trash";
import Monster from "./Monster";
import HTML5Backend from "react-dnd-html5-backend";
import { NavLink } from "react-router-dom";
import { DragDropContext } from "react-dnd";
import { Query, Mutation } from "react-apollo";
import { MagicSpinner } from 'react-spinners-kit';
import _ from 'lodash';
import { EVENTS, CREATURES } from '../apollo/templates/Queries';
import { CREATECREATURE, DELETECREATURE } from '../apollo/templates/Mutations';
import ErrorMessage from '../apollo/ErrorMessage';
import client from "../apollo/client";
const update = require("immutability-helper");

var newkey = 5;

class App extends Component {
  state = {
    trashVis: true,
    selectedOption: '',
    textValue: '',
    monsterData: [],
    monsters: [],
    cards: [],
    projectID: this.props.location.state.projectID,
    rulebook: this.props.location.state.rulebook,
    currentEvent: null
  };

  async componentDidMount(){

    const cards = await client.query({
      query: EVENTS,
      variables: {
        projectID: this.state.projectID
      }
    })

    const monsters = await client.query({
      query: CREATURES,
      variables: {
        fromRulebook: this.state.rulebook
      }
    })

    cards.data.events.forEach(element => {
      element.active = true
    });

    this.setState({
      cards: cards.data.events,
      monsterData: monsters.data.creatures,
      selectedOption: monsters.data.creatures[0].name,
      currentEvent: cards.data.events[0] ? cards.data.events[0].id : null,
      textValue: cards.data.events[0] ? cards.data.events[0].title : '',
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

  async showEvent(event) {

    const monstersOfEvent = await client.query({
      query: CREATURES,
      variables: {
        eventID: event.id
      }
    })
  }

  toggleTrashVisible(vis) {
    this.setState({
      trashVis: !vis
    });
    console.log(trashVis);
  }

  showEvent(eType) {
    this.setState({
      textValue: event.title,
      currentEvent: event.id,
      monsters: monstersOfEvent.data.creatures
    });

    console.log(event.eventRole);
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

  async addCard(cards, eType) {
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
      selection.push(<option>{this.state.monsterData[i].name}</option>);
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
        id: monsters.id,
        key: newkey
      });
      return { monsters };
    });
  }

  deleteMonster = id => {

    client.mutate({
      mutation: DELETECREATURE,
      variables: {
        id
      },
      update: (cache, { data: { deleteCreature }}) => {
        
        const { creatures } = cache.readQuery({
          query: CREATURES,
          variables: {
            eventID: this.state.currentEvent
          }
        })

        cache.writeQuery({
          query: CREATURES,
          variables: {
            eventID: this.state.currentEvent
          },
          data: {
            creatures: creatures.filter(creature => creature.id !== deleteCreature.id)
          }
        })
      }
    })

    /* this.setState(prevState => {
      return {
        monsters: prevState.monsters.filter(monster => monster.id !== id)
      };
    });
    console.log("deleting id:" + id); */
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
                    <h4>{this.state.textValue}</h4>
                    <br />
                    <Query
                    query={CREATURES}
                    variables={{
                      eventID: this.state.currentEvent
                    }}>
                    {({ loading, error, data }) => {
                    

                      if(loading){
                        return (
                      <center>
                        <MagicSpinner size={50} color="#6cd404" loading={loading} />
                      </center>
                        )
                      } 
        
                      if(error){
                        return (
                          <center>
                            <ErrorMessage error={error} message={"Unable to get Projects"} />
                          </center>
                        )
                      }

                      if(_.isEmpty(data) || data.creatures.length <= 0) {
                        return <center><Alert bsStyle="info"><h4>No Creatures in this Event</h4></Alert></center>
                      } else {
                        return (
                        <div className="eventInfoArea" id="style-1">
                          {data.creatures.map((monster, i) => (
                            <Monster
                              key={monster.id}
                              name={monster.name}
                              attack={monster.Conditions.physical.fitness.toughness}
                              deleteMonster={e => this.deleteMonster(monster.id)}
                              id={monster.id}
                              rulebook={this.state.rulebook}
                            />
                          ))}
                        </div>
                        )
                      }
                      }}
                    </Query>
                    <select
                      value={this.state.selectedOption}
                      onChange={this.handleOptionChange}
                        className="addMonsterMenuOption"
                    >
                      {this.fillMonsterList()}
                    </select>
                    <Mutation
                    mutation={CREATECREATURE}
                    update={(cache, { data : { createCreature }}) => {

                      const { creatures } = cache.readQuery({
                        query: CREATURES,
                        variables: {
                          eventID: this.state.currentEvent
                        }
                      })

                      cache.writeQuery({
                        query: CREATURES,
                        variables: {
                          eventID: this.state.currentEvent
                        },
                        data: {
                          creatures: creatures.concat(createCreature)
                        }
                      })

                    }}
                    >
                    {createCreature => (
                      <form
                      onSubmit={e => {
                        e.preventDefault()
                        const monster = this.state.monsterData.filter(monster => monster.name === this.state.selectedOption)[0]

                        createCreature({
                          variables: {
                            data: {
                              event: this.state.currentEvent,
                              name: monster.name,
                              race: monster.race,
                              shadow: monster.shadow,
                              rulebook: this.state.rulebook,
                              Conditions: {
                                physical: {
                                  fitness: {
                                    painThreshold: monster.Conditions.physical.fitness.painThreshold,
                                    toughness: monster.Conditions.physical.fitness.toughness
                                  }
                                },
                                spiritual: {
                                  corruption: {
                                    current: monster.Conditions.spiritual.corruption.current,
                                    threshold: monster.Conditions.spiritual.corruption.threshold,
                                    permanent: monster.Conditions.spiritual.corruption.permanent
                                  }
                                }
                              },
                              attributes: {
                                accurate: monster.attributes.accurate,
                                cunning: monster.attributes.cunning,
                                discreet: monster.attributes.discreet,
                                persuasive: monster.attributes.persuasive,
                                quick: monster.attributes.quick,
                                resolute: monster.attributes.resolute,
                                strong: monster.attributes.strong,
                                vigilant: monster.attributes.vigilant,
                                defense: monster.attributes.defense
                              }
                            }
                          }
                        })
                      }}
                      >
                        <button
                        type='submit'
                        >
                          add
                        </button>
                      </form>
                    )}
                    </Mutation>
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
                                 showEvent={e => this.showEvent(event)}
                                 handleDrop={id => this.deleteItem(id)}
                              toggleTrashVisible={e =>
                                this.toggleTrashVisible(this.state.trashVis)
                            />
                          ))}
                        </div>
                      </center>

                      <div className="Footer">
                        <Trash visible={this.state.trashVis} />

                        <input
                          ref="eventText"
                          type="text"
                          placeholder="type in new Event"
                        />

                        <div className="createButtonWrapper">
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

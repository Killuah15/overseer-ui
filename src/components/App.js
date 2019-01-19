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
import { CREATECREATURE, DELETECREATURE, CREATEEVENT, DELETEEVENT, UPDATEEVENT } from '../apollo/templates/Mutations';
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
    currentEvent: null,
    eventsLoading: false
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

  updateEventIndices = () => {

    if(this.state.eventsLoading)
      return

    this.setState({
      eventsLoading: true
    })

    this.state.cards.map(card => {
      client.mutate({
        mutation: UPDATEEVENT,
        variables: {
          id: card.id,
          data: {
            index: _.findIndex(this.state.cards, cachedCard => cachedCard.id === card.id)
          }
        }
      })
    })

    this.setState({
      eventsLoading: false
    })
  }

  deleteItem = async id => {

    if(this.state.eventsLoading)
      return

    this.setState({
      eventsLoading: true
    })

    const {data: { deleteEvent }} = await client.mutate({
      mutation: DELETEEVENT,
      variables: {
        id
      },
      update: (cache, { data: { deleteEvent }}) => {
        
        const { events } = cache.readQuery({
          query: EVENTS,
          variables: {
            projectID: this.state.projectID
          }
        })

        cache.writeQuery({
          query: EVENTS,
          variables: {
            projectID: this.state.projectID
          },
          data: {
            events: events.filter(event => event.id !== deleteEvent.id)
          }
        })
      } 
    })

    this.setState(prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== deleteEvent.id),
        currentEvent: prevState.currentEvent === id ? null : prevState.currentEvent,
        textValue: prevState.currentEvent === id ? '' : prevState.textValue,
        eventsLoading: false
      };
    });
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

    this.setState({
      textValue: event.title,
      currentEvent: event.id,
      monsters: monstersOfEvent.data.creatures
    });

    console.log(event.eventRole);
  }

  toggleTrashVisible(vis) {
    this.setState({
      trashVis: !vis
    });
    console.log(trashVis);
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

  async addCard(eType) {

    if(this.state.eventsLoading)
      return

    this.setState({
      eventsLoading: true
    })

    if (this.refs.eventText.value !== "") {

      const { data: { createEvent }} = await client.mutate({
        mutation: CREATEEVENT,
        variables: {
          data: {
            title: this.refs.eventText.value,
            description: null,
            eventRole: eType,
            index: this.state.cards.length,
            project: this.state.projectID
          }
        },
        update: (cache, { data: { createEvent }}) => {
        
          const { events } = cache.readQuery({
            query: EVENTS,
            variables: {
              projectID: this.state.projectID
            }
          })
  
          cache.writeQuery({
            query: EVENTS,
            variables: {
              projectID: this.state.projectID
            },
            data: {
              events: events.concat([createEvent])
            }
          })
        }
      })


      createEvent.active = true

      this.setState({
        cards: [...this.state.cards, createEvent],
        currentEvent: this.state.cards.length === 0 && createEvent !== null && createEvent !== undefined ? createEvent.id : this.state.currentEvent,
        textValue: this.state.cards.length === 0 && createEvent !== null && createEvent !== undefined ? createEvent.title : this.state.textValue,
        eventsLoading: false
      });


      this.refs.eventText.value = "";
        return this.state.cards;
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

 /*  addMonster(monsters) {
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
  } */

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
                              monster={monster}
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
                    <div className="addMonsterMenu">
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
                        {this.state.eventsLoading === true && <MagicSpinner size={50} color="#6cd404" loading={true} />}
                          <div className="eventsArea" id="style-1">
                               {
                               this.state.cards.map((event, i) => (
                               <EventCard
                                key={event.id}
                                index={i}
                                id={event.id}
                                text={event.title}
                                item={event}
                                active={event.active}
                                eventType={event.eventRole}
                                moveCard={this.moveCard}
                                updateIndices={this.updateEventIndices}
                                toggleChecked={e => this.toggleChecked(i)}
                                showEvent={e => this.showEvent(event)}
                                handleDrop={id => this.deleteItem(event.id)}
                                toggleTrashVisible={e => this.toggleTrashVisible(this.state.trashVis)}
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
                              this.addCard("GENERIC");
                            }}
                          >
                            Default
                          </button>
                          <button
                            className="createButtonCombat"
                            onClick={e => {
                              this.addCard("COMBAT");
                            }}
                          >
                            Combat
                          </button>
                          <button
                            className="createButtonQuest"
                            onClick={e => {
                              this.addCard("QUEST");
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

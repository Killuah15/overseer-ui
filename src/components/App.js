import React, { Component } from 'react';
import '../public/styles/App.css';
import { Button, Grid, Row, Col, Clearfix, Panel } from 'react-bootstrap';
import Card from './Card';
import Trash from './Trash';
import Monster from './Monster';
import HTML5Backend from 'react-dnd-html5-backend'
import { NavLink } from 'react-router-dom';
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');


var newkey = 5;


class App extends Component {

  state = {
    textValue: 'Test',
    cards: [
      {
        id: 1,
        text: 'This is an Event',
        key: 1,
        active: true,
        eventType: 'Default',

      },
      {
        id: 2,
        text: 'Wild Turtle Attacks!',
        key: 2,
        active: true,
        eventType: 'Combat',
      },
    ],
  }


  deleteItem = id => {
    this.setState(prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== id)
      }
    })
    console.log('deleting id:' + id);
  }

  toggleChecked(index) {
    const card = this.state.cards[index];

    this.setState((e) => {

      if (card.active) {
        card.active = false;
        return { card }
      } else {
        card.active = true;
        return { card }
      }


    })

    console.log(card.eventType)
  };


  showEvent(eType) {
    this.setState({
      textValue: eType
    })

    console.log(eType)

  };


  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }


  addCard(cards, eType) {
    console.log("new Card");
    console.log(cards);
    newkey++;

    if(this.refs.eventText.value !== ""){
      this.setState((e) => {
        cards.push(
          {
            id: cards.length + 2,
            text: this.refs.eventText.value,
            key: newkey,
            active: true,
            eventType: eType
          }
        );
        this.refs.eventText.value = "";
        return { cards }
      })
    }
    
  }

  render() {

    return (
      <div className="App">

      <NavLink to="/Projects">Back</NavLink>

        <Grid>
          <Row className="show-grid">
            <Col md={6} mdPush={6}>
              <code>{
                <div className="eventInfo">
                  {this.state.textValue}
                  <Monster name="Turtle" attack="12" willpower="1" />
                  <button onClick={(e) => {

                  }}>Create Monster</button>
                </div>}</code>
            </Col>
            <Col md={6} mdPull={6}>
              <code>{
                <div>
                  <Panel>
                    <Panel.Body> <div className="Events"><h1>Events</h1>
                      <br></br>
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
                            toggleChecked={(e) => this.toggleChecked(i)}
                            showEvent={(e) => this.showEvent(card.eventType)}
                            handleDrop={(id) => this.deleteItem(id)}
                          />
                        ))}
                      </div>
                    </div></Panel.Body>
                    <Panel.Footer>
                      <div className="Footer">
                    
                        <Trash />

                        <input ref="eventText" type="text" placeholder="type in new Event" />
                        <br></br>
                        <button className="createButtonDefault" onClick={(e) => {
                          this.addCard(this.state.cards, "Default"
                          )
                        }}>Default</button>
                        <button className="createButtonCombat" onClick={(e) => {
                          this.addCard(this.state.cards, "Combat"
                          )
                        }}>Combat</button>
                        <button className="createButtonQuest" onClick={(e) => {
                          this.addCard(this.state.cards, "Quest"
                          )
                        }}>Quest</button>

                      </div></Panel.Footer>
                  </Panel>
                </div>
              }</code>

            </Col>
          </Row>
        </Grid>


      </div>
      
    );
  }
}

export default DragDropContext(HTML5Backend)(App)

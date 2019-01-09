import React, { Component } from 'react';
import {DropTarget} from 'react-dnd';
import {trash_can} from './img/trash_can.png'; 

const dropSource = {
    drop(props, monitor) {
      return monitor.getItem();
    },
  }

function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem(),
        subtype: 'trash'
    }
}

class Trash extends Component{
    render(){
        const {connectDropTarget, hovered} = this.props;
        const backgroundColor = hovered ? '#FC7468' : '#FC4636';
        return connectDropTarget(
            <div className="target" style={{backgroundColor}}>
            <center><img className="trashIcon" draggable="false" src={require('./img/trash_can.png')} /></center>
            </div>
        )  
    }
}

export default DropTarget('card', dropSource, collect)(Trash);

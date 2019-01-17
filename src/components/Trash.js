import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const dropSource = {
  drop(props, monitor) {
    return monitor.getItem();
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
    subtype: "trash"
  };
}

class Trash extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      trashVis: props.visible
    };
  }

  render() {
    const { connectDropTarget, hovered } = this.props;
    const backgroundColor = hovered ? "#FC7468" : "#FC4636";
    return connectDropTarget(
      <div
        className={this.state.trashVis ? "Trash" : "TrashHide"}
        style={{ backgroundColor }}
      >
        <center>
          <img
            className="trashIcon"
            draggable="false"
            src={require("../public/img/trash_can.png")}
          />
        </center>
      </div>
    );
  }
}

export default DropTarget("card", dropSource, collect)(Trash);

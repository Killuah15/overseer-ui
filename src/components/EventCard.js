import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { MagicSpinner } from "react-spinners-kit";
import flow from "lodash/flow";
//import "./App.css";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      key: props.key,
      item: props.item,
      active: props.active,
      eventType: props.eventType,
      subtype: "somestuff"
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.updateIndices(props.item);
      return;
    } else if (monitor.getDropResult().subtype === "somestuff") {
      props.handleDrop(props.item.id);
    } else {
      props.updateIndices(props.item);
    }
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

function eventClassName(eType, isActive) {
  switch (eType) {
    case "GENERIC":
      if (isActive) {
        return "eventDefault";
      } else {
        return "eventDefaultChecked";
      }

    case "COMBAT":
      if (isActive) {
        return "eventCombat";
      } else {
        return "eventCombatChecked";
      }

    case "QUEST":
      if (isActive) {
        return "eventQuest";
      } else {
        return "eventQuestChecked";
      }

    default:
      return "eventDefault";
  }
}

class EventCard extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      toggleChecked,
      showEvent,
      active,
      toggleTrashVisible,
      eventType
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div
            style={{ opacity }}
            className={eventClassName(eventType, active)}
          >
            {
              <button className="infoButton" onClick={showEvent}>
                <img src={require("../public/img/left_arrow.svg")} />
              </button>
            }
            {text}
            {
              <button className="checkedButton" onClick={toggleChecked}>
                <img src={require("../public/img/checkmark.svg")} />
              </button>
            }
          </div>
        )
      )
    );
  }
}

export default flow(
  DragSource("card", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("card", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(EventCard);

import React from "react"

class NewTaskForm extends React.Component {
  render() {
    const {onItemAdded} = this.props;
    return (
      <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={() => onItemAdded('Hello')}
    />
    )
  }
}

export default NewTaskForm
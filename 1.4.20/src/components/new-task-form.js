import React from "react"

class NewTaskForm extends React.Component {


  state = {
    input: ''
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.input)
    this.setState({
      input: ''
    })
  }

  render() {
    return (
    <form onSubmit={this.onSubmit}>
      <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onChange={this.onInputChange}
      value={this.state.input}
    />
    </form>
    )
  }
}

export default NewTaskForm
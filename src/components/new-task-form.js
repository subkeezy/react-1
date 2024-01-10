import React from 'react';
import propTypes from 'prop-types';

NewTaskForm.propTypes = {
  onItemAdded: propTypes.func.isRequired,
};

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  onInputChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { input } = this.state;
    const { onItemAdded } = this.props;
    onItemAdded(input);
    this.setState({
      input: '',
    });
  }

  render() {
    const { input } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onInputChange}
          value={input}
        />
      </form>
    );
  }
}

export default NewTaskForm;

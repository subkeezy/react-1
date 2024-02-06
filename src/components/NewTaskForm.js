import React from 'react';
import propTypes from 'prop-types';
class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      minInput: '',
      secInput: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onMinInputChange = this.onMinInputChange.bind(this);
    this.onSecInputChange = this.onSecInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
      this.setState({
        input: e.target.value,
      });
  }

  onMinInputChange(e) {
    if (e.target.value.length <= 2) {
      this.setState({
        minInput: e.target.value,
      })
    } else {
      console.log('not valid number')
    }
 
  }

  onSecInputChange(e) {
    if (e.target.value.length <= 2) {
      this.setState({
        secInput: e.target.value,
      })
    } else {
      console.log('not valid number')
    }
  }

  onSubmit(e) {
    const { input, minInput, secInput } = this.state;
    const { onItemAdded } = this.props;
    if (input && minInput && secInput && e.key === 'Enter') {
      onItemAdded(input, minInput, secInput);
      this.setState({
        input: '',
        minInput: '',
        secInput: ''
      });
    }

  }

  render() {
    const { input, minInput, secInput } = this.state;
    return (
      <form className="new-todo-form" onKeyDown={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onInputChange}
          value={input}
        />
        <input
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onMinInputChange}
          value={minInput}
        />
        <input
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={this.onSecInputChange}
          value={secInput}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: propTypes.func.isRequired,
};

export default NewTaskForm;

import React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';

export default function NewTaskForm(props) {
  const [input, setInput] = useState('')
  const [minInput, setMinInput] = useState('')
  const [secInput, setSecInput] = useState('')

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const onMinInputChange = (e) => {
    if (e.target.value.length <= 2) {
      setMinInput(e.target.value)
    } else {
      console.log('not valid number')
    }

  }

  const onSecInputChange = (e) => {
    if (e.target.value.length <= 2) {
      setSecInput(e.target.value)
    } else {
      console.log('not valid number')
    }
  }

  const onSubmit = (e) => {
    const { onItemAdded } = props;
    if (input && minInput && secInput && e.key === 'Enter') {
      onItemAdded(input, minInput, secInput);
      setInput('')
      setMinInput('')
      setSecInput('')
    }
  }

  return (
    <form className="new-todo-form" onKeyDown={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onInputChange}
        value={input}
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={onMinInputChange}
        value={minInput}
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onChange={onSecInputChange}
        value={secInput}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: propTypes.func.isRequired,
};

import React from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

import Timer from './Timer';

class Task extends React.Component {
  render() {
    const {
      id,
      description,
      created,
      onDeleted,
      onToggleEdit,
      onToggleDone,
      onEditing,
      onTimerUnmount,
      filter,
      timerPaused,

      done,
      edit,
    } = this.props;

    const timer = (
      <Timer 
        {...this.props}
        onTimerUnmount={onTimerUnmount}
        done={done}
        filter={filter}
        timerPaused={timerPaused}
      />
    )

    let classNames = cn({
      completed: done,
      ' editing': edit,
    });



    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label>
            <span className="title">{description}</span>
            {timer}
            <span className="description">{created}</span>
          </label>
          <button type="button" onClick={onToggleEdit} className="icon icon-edit" />
          <button type="button" onClick={onDeleted} className="icon icon-destroy" />
        </div>
        <input onKeyDown={(e) => onEditing(e, id)} type="text" className="edit" defaultValue={description} />
      </li>
    );
  }
}


Task.propTypes = {
  id: propTypes.string,
  description: propTypes.string,
  edit: propTypes.bool.isRequired,
  done: propTypes.bool.isRequired,
  created: propTypes.string.isRequired,
  onDeleted: propTypes.func.isRequired,
  onToggleEdit: propTypes.func.isRequired,
  onToggleDone: propTypes.func.isRequired,
  onEditing: propTypes.func.isRequired,
};
export default Task;
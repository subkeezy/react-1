import React from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

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

      edit,
      done,
    } = this.props;

    let classNames = cn({
      // eslint-disable-next-line prettier/prettier
      completed: done,
      ' editing': edit,
    });
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} />
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button type="button" onClick={onToggleEdit} className="icon icon-edit" />
          <button type="button" onClick={onDeleted} className="icon icon-destroy" />
        </div>
        <input onKeyDown={(e) => onEditing(e, id)} type="text" className="edit" defaultValue={description} />
      </li>
    );
  }
}

Task.defaultProps = {
  description: 'Tasks default value',
  id: Math.random(),
};

Task.propTypes = {
  id: propTypes.number,
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

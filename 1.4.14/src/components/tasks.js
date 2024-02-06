
import React from "react";


class Tasks extends React.Component {

  render() {

    const {id, description, created,
          onDeleted, onToggleEdit, onToggleDone, onEditing,
          edit, done} = this.props;
  
    let classNames;
    if (done) {
      classNames = "completed";
    } else if (edit) {
      classNames += " editing";
    } else {
      classNames = "";
    }



    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle"
                type="checkbox"
                onChange={onToggleDone}/>
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button onClick={onToggleEdit} className="icon icon-edit"></button>
          <button onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
        <input onKeyDown={(e) => onEditing(e, id)} type="text" className="edit" defaultValue={description} autoFocus/>
      </li>
  )
  }
}


export default Tasks

import React from "react";


class Tasks extends React.Component {

  constructor() {
    super();

    this.state = {
      done: false,
      edit: false
    }

    this.onCheckboxChange = () => {
      this.setState((state) => {
        return {
          done: !state.done
        }
      })
    }

    this.onEditing = () => {
      this.setState({
        edit: true,
      })
    }

  //   this.onCancelEditing = (event) => {
  //     console.log(event)
  //     if (event.keyCode === 13) {
  //       this.setState({
  //         edit: false,
  //         cancelEdit: true
  //       })
  //       let newProps = this.props
  //       newProps.description = event.target.value
  //     }
  //   }
  }


  render() {

    const { done, edit } = this.state;
    const {id, description, created, onDeleted} = this.props;
  
    let classNames;
    if (done) {
      classNames = "completed";
    } else if (edit) {
      classNames += " editing";
    } else {
      classNames = "";
    }

    console.log(id)


    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle"
                type="checkbox"
                onChange={this.onCheckboxChange}/>
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button onClick={this.onEditing} className="icon icon-edit"></button>
          <button onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" defaultValue={description} />
      </li>
  )
  }
}


export default Tasks
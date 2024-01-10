import React from "react";

import {formatDistanceToNow} from 'date-fns';

import Header from './header';
import TaskList from './task-list';
import Footer from './footer';

class App extends React.Component {

  maxId = 1;

  state = {
    data: [
      this.createTodoItem(),
      this.createTodoItem(),
      this.createTodoItem('Specified value'),
    ],
    filter: 'all'
  }

  createdTime() {
    let time = 
    ` created ${formatDistanceToNow(
      new Date(),
      {includeSeconds: true}
    )} ago`
    return time
  }

  createTodoItem(description) {
    return {
      id: this.maxId++,
      description: description,
      created: this.createdTime(),
      done: false,
      edit: false
    }
  }


  addItem = (text) => {

    const newItem = this.createTodoItem(text)

    this.setState(({data}) => {
      const newArray = [
        ...data,
        newItem
      ]
      return {
        data: newArray
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      const idx = data.findIndex((el) => el.id === id)

      const newData = [
        ...data.slice(0, idx),
        ...data.slice(idx + 1)
      ]

      return {
        data: newData
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({data}) => {
        const filteredData = data.filter(el => !el.done)
        return {
          data: filteredData
        }
      })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx), newItem,
      ...arr.slice(idx + 1)
    ]
  }

  onToggleEdit = (id) => {
    this.setState(({data}) => {
      return {
        data: this.toggleProperty(data, id, 'edit')
      }
    })
  }

  onEditing = (event, id) => {
    if (event.key === 'Enter') {
      this.setState(({data}) => {
        const idx = data.findIndex((el) => el.id === id)

        const oldItem = data[idx];
        const newItem = {...oldItem, description: event.target.value, edit: !oldItem.edit};

        const newData = [
          ...data.slice(0, idx), newItem,
          ...data.slice(idx + 1)
        ];
  
        return {
          data: newData
        }
      })
    } else if (event.key === 'Escape') {
      this.setState(({data}) => {
        return {
          data: this.toggleProperty(data, id, 'edit')
        }
      })
    }
  }

  onToggleDone = (id) => {
    this.setState(({data}) => {
      return {
        data: this.toggleProperty(data, id, 'done')
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  onFilter(data, filter) {
    if (filter === 'all') {
      return data
    } else if (filter === 'active') {
      return data.filter((item) => (!item.done))
    } else if (filter === 'completed') {
      return data.filter((item) => item.done)
    }
  }

  render() {

    const {data, filter} = this.state
    const doneCount = this.state.data.filter((el) => el.done).length;
    const todoCount = this.state.data.length - doneCount;
    const visibleItems = this.onFilter(data, filter);
  
    return (
      <section className="todoapp">
        <Header 
          onItemAdded={this.addItem}/>
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleEdit={this.onToggleEdit}
          onToggleDone={this.onToggleDone}
          onEditing={this.onEditing}
        />
        <Footer
        doneCount={doneCount}
        todoCount={todoCount}
        deleteCompleted={this.deleteCompleted}
        filter={filter}
        onFilterChange={this.onFilterChange}
        />
      </section>
    )
  }
  }

export default App
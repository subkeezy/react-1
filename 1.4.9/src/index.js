import React from 'react';
import ReactDOM from 'react-dom/client';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Header from './components/header';
import TaskList from './components/task-list';
import Footer from './components/footer';

import './index.css';

class App extends React.Component {

  maxId = 100;

  state = {
    data: [
      {id: 1, description: 'Completed task', created: ` created ${formatDistanceToNow(
        new Date(),
        {includeSeconds: true}
      )} ago`},
      {id: 2, description: 'Editing task', created: ` created ${formatDistanceToNow(
        new Date(),
        {includeSeconds: true}
      )} ago`},
      {id: 3, description: 'Active task', created: ` created ${formatDistanceToNow(
        new Date(),
        {includeSeconds: true}
      )} ago`}
    ]
  }

  addItem = (text) => {

    console.log('Added', text)

    // generate new item
    const newItem = {
      id: this.maxId++,
      description: text,
      created: ` created ${formatDistanceToNow(
        new Date(),
        {includeSeconds: true}
      )} ago`
    }

    // add new item in array
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

  render() {
  
    return (
      <section className="todoapp">
        <Header 
          onItemAdded={this.addItem}/>
        <TaskList
          todos={this.state.data}
          onDeleted={ this.deleteItem}/>
        <Footer />
      </section>
    )
  }
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

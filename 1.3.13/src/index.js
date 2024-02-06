import React from 'react';
import ReactDOM from 'react-dom/client';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Header from './components/header';
import TaskList from './components/task-list';
import Footer from './components/footer';

import './index.css';

const App = () => {

  const time = formatDistanceToNow(
    new Date(),
    {includeSeconds: true}
  )

  const data = [
    {id: 1, status: 'completed', description: 'Completed task', created: ` created ${time} ago`},
    {id: 2, status: 'editing', description: 'Editing task', created: ` created ${time} ago`},
    {id: 3, status: '', description: 'Active task', created: ` created ${time} ago`}
  ]

  return (
    <section className="todoapp">
      <Header />
      <TaskList todos={data}/>
      <Footer />
    </section>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

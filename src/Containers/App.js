import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
// import { sidebar } from './Components/Sidebar/Sidebar.js';
import Content from '../Components/Content/Content.js';
import Login from '../Components/Login/Login.js';
import './App.css';

class App extends Component {
  state = {
    taskList: [
      {'name': 'Task1', 'number': 10},
      {'name': 'Task2', 'number': 20},
      {'name': 'Task3', 'number': 30}
    ]
  }

  componentDidMount(){
    console.log("in did mount");
 
  }

static getDerivedStateFromProps(nextProps, prevState){
    console.log("in getDerivedStateFromProps");
    return prevState;
}

shouldComponentUpdate(nextProps, nextState) {
    console.log("in should component update");
    return false;
}

componentDidUpdate(prevProps, prevState) {
  console.log("in did update");
}

  switchNameHandler = (newName) => {
    this.setState ({
      taskList: [
        {'name': newName, 'number': 20},
        {'name': 'Task5', 'number': 40},
        {'name': 'Task6', 'number': 60}
      ]
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      taskList: [
        {'name': event.target.value, 'number': 20},
        {'name': 'Task5', 'number': 40},
        {'name': 'Task6', 'number': 60}
      ]
    });
  };

  render() {
    // In line style method
    const style = {
      backgroundColor: 'while',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    console.log("rennnnnderrr");
    return (
      <React.Fragment>
        <div className="wrapper">
            <Login></Login>
        </div>
        <div className="App">
          <Header />
          <div>
            <h3>This is my first React App</h3>
          </div>
          <button 
            style={style}
            onClick={() => this.switchNameHandler('Task7!')}>Switch Name</button>
          <Content 
            name={this.state.taskList[0].name}
            number={this.state.taskList[0].number}
            click={this.switchNameHandler}
            change={this.nameChangedHandler} />
          <Content
            name={this.state.taskList[1].name} 
            number={this.state.taskList[1].number}
            click={this.switchNameHandler.bind(this, 'Task8')}> Childern section </Content>
          <Content 
            name={this.state.taskList[2].name} 
            number={this.state.taskList[2].number} 
            click={this.switchNameHandler.bind(this, 'Task9')} />
        </div>
      </React.Fragment>
    );
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'This is my first React App'));
  }
}

export default App;

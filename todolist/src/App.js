import React from 'react';
import Todolisttemplate from './components/js/Todolisttemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input : "",
      todos: [

      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(todos => this.setState({todos : todos}))
      .catch(err => console.log(err))
  }

  handleInitInfo() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(todos => this.setState({todos : todos}))
      .catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleCreate() {
    const {input, todos} = this.state;
    if (input === "") {
      alert("2023년 목표를 입력해주세요");
      return;
    }

    this.setState({
      input:"",
      todos: todos.concat({
        id         : 0,
        content    : input,
        isComplete : false
      })
    });

    const data = {
      body: JSON.stringify({"content" : input}),
      headers: {'Content-Type':'applicaiton/json'},
      method: 'post'
    }
    fetch("/api/todos", data)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.handleCreate();
    }
  }

  handleToggle(id) {
    const todos = this.state.todos;

    const isComplete = todos.find(todo => todo.id === id).isComplete;
    if(!window.confirm(isComplete ? "미완료 처리하시겠습니까?" : "완료 처리 하시겠습니까?"))
    { return;
    }
    
    const index = todos.findIndex(todo => todo.id === id);

    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      isComplete : !selected.isComplete
    };

    this.setState({
      todos : nextTodos
    });

    const data = {
      headers:{'Content-Type':'applicaiton/json'},
      method:'put'
    }
    fetch("/api/todos/" + id, data)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }

  handleRemove(id) {
    const todos = this.state.todos;

    const removeContent = todos.find(todo => todo.id === id).content;
    if(!window.confirm("'" + removeContent + "'을 삭제하시겠습니까?"))
    { return;
    }

    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });
  

  const data = {
    headers:{'Content-Type':'applicaiton/json'},
    method:'delete'
  }
  fetch("/api/todos/" + id, data)
  .then(res => {
    if(!res.ok) {
      throw new Error(res.status);
    } else {
      return this.handleInitInfo();
    }
  })
  .catch(err => console.log(err));
}

  render() {
    return (
      <Todolisttemplate form={(
      <Form
        value     ={this.state.input}
        onChange  ={this.handleChange}
        onCreate  ={this.handleCreate}
        onKeyDown={this.handleKeyDown} />
        )}>
        <TodoItemList 
          todos   ={this.state.todos}
          onToggle={this.handleToggle}
          onRemove={this.handleRemove} />
      </Todolisttemplate>
    );
  }
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/form';
import Todolist from './components/todolist';

function App (){
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);
  //Func use only once
  useEffect(()=>{
    getLocalTodos();
  },[]);
  //Function
  useEffect(() => {
    const filterHandler = () => {
      switch(status)
      {
        case "completed":
          setfilteredTodos(todos.filter( todo => todo.completed === true ))
          break;
        case "uncompleted":
          setfilteredTodos(todos.filter( todo => todo.completed !== true ))
          break;
        default:
          setfilteredTodos(todos);
          break;
      }
    }
    const setLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    filterHandler();
    setLocalTodos();
  },[todos,status])


  const getLocalTodos = () => {
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else {
      let todolocal=JSON.parse(localStorage.getItem('todos'));
      setTodos(todolocal);
    }
  }
  
  return ( 
    <div className='App'>
      <header>
        <h1>Francis's To-Do List</h1>
      </header>
      <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
      <Todolist filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
    </div>
   );
}

export default App;
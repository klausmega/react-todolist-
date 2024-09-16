import React,{useState,useRef,useEffect} from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4}  from 'uuid';
function App() {
 const [todos,setTodos]=  useState([])
 const todoNameRef= useRef()
  const LOCAL_STORAGE_KEY ='todoApp.todos'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);



 useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
 },[todos]) 

 function toggleTodo(id){
  const newTodos =[...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
 }

 function handleAddTodo(e){
  const name= todoNameRef.current.value
  if(name === '') return
    setTodos(prevTools =>{
      return [...prevTools,{id: uuidv4(),name: name, complete: false}]
    })
    todoNameRef.current.value = '';
  
 }
  return (
    <>
       <TodoList todos = {todos} toggleTodo={toggleTodo}/>
       <input ref={todoNameRef} type="text" />
       <button  onClick={handleAddTodo}> add Todo</button>
       <button> Clear completed Todo</button>
       <div> 0 left t do</div>
       
    </>
   
  );
}

export default App;

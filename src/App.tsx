import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/todoList/TodoList";
import styled from "styled-components";
import {v1} from "uuid";


export type filterValuesType = "all"| "completed"| "active";

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "REACT", isDone: false},
    {id: v1(), title: "Redax", isDone: false},
  ]);

  function changeFilter(value:filterValuesType){
    setFilter(value)

  }
  function addTask( title:string) {
    let newTask = { id:v1() , title:title, isDone:false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus (taskId:string, isDone:boolean){
    let task = tasks.find(t=>t.id === taskId);
    if (task){
      task.isDone = isDone;
    }

    setTasks( [...tasks])
  }



  let [filter,setFilter] = useState<filterValuesType>("all")

  let filtredTasksForTodoList = tasks
  if (filter === "completed") {
    filtredTasksForTodoList = tasks.filter( t => (t.isDone === true))
  }
  if (filter === "active") {
    filtredTasksForTodoList = tasks.filter( t => (t.isDone === false))
  }


  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  return (
      <Wrapper>
        <TodoList title="What to learn"
                  tasks={filtredTasksForTodoList}
                  removeTask={removeTask}
                  changeFilter = {changeFilter}
                  addTask = {addTask}
                  changeStatus={changeStatus}
        />
        {/*<TodoList title="Movies" tasks = {tasks2}/>*/}
      </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex`
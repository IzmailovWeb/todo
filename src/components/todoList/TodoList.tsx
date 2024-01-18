import React, {ChangeEvent,  KeyboardEvent, useState} from 'react';
import styled from "styled-components";
import {filterValuesType} from "../../App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}


type TodoListPropsType = {
    title: string
    tasks: TasksPropsType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId:string,isDone:boolean)=> void
    filter:filterValuesType
};
export const TodoList = (props: TodoListPropsType) => {
    const {filter} =props;

    const [newTaskTite, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string| null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTite)
            setNewTaskTitle("")
        }
    }
    const addTask = ()=>{
        if (newTaskTite.trim() !== ""){
            props.addTask(newTaskTite.trim())
            setNewTaskTitle("")
        }
        else {
            setError("Title is required")
        }

    }

    const onAllClickHandler = ()=> props.changeFilter("all")
    const onActiveClickHandler = ()=> props.changeFilter("active")
    const onCompletedClickHandler = ()=> props.changeFilter("completed")

    return (
        <Card>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTite} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error":""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <List>
                {
                    props.tasks.map((t,) => {
                        const {id, title, isDone} = t;
                        const onRemoveHandler = ()=>{props.removeTask(id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
                            props.changeStatus(id, e.currentTarget.checked)}
                        return (
                            <Item key={id} className={isDone ? 'is-done':""}>
                                <input onChange={onChangeHandler} type={"checkbox"} checked={isDone}/>
                                <span>{title} </span>
                                <button onClick={onRemoveHandler}>x</button>
                            </Item>
                        )
                    })
                }
            </List>
            <div>
                <button className={filter === 'all'? 'active-filter':''}
                    onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active'? 'active-filter':''}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={filter === 'completed'? 'active-filter':''}
                    onClick={onCompletedClickHandler}>Completed</button>

            </div>
        </Card>
    );
};

const Card = styled.div`
    width: 200px;
`

const List = styled.ul`
    padding: unset;
`

const Item = styled.li`
    list-style: none;
`

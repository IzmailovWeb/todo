import React, {ChangeEvent,  KeyboardEvent, useState} from 'react';
import styled from "styled-components";
import {filterValuesType} from "../../App";


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
};
export const TodoList = (props: TodoListPropsType) => {
    const [newTaskTite, setNewTaskTitle] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.charCode === 13) {
            props.addTask(newTaskTite)
            setNewTaskTitle("")
        }
    }
    const addTask = ()=>{
        props.addTask(newTaskTite)
        setNewTaskTitle("")
    }

    const onAllClickHandler = ()=> props.changeFilter("all")
    const onActiveClickHandler = ()=> props.changeFilter("active")
    const onCompletedClickHandler = ()=> props.changeFilter("completed")

    return (
        <Card>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTite} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <List>
                {
                    props.tasks.map((t,) => {
                        const onRemoveHandler = ()=>{props.removeTask(t.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
                            props.changeStatus(t.id, e.currentTarget.checked)}
                        return (
                            <Item key={t.id}>
                                <input onChange={onChangeHandler} type={"checkbox"} checked={t.isDone}/>
                                <span>{t.title} </span>
                                <button onClick={onRemoveHandler}>x</button>
                            </Item>
                        )
                    })
                }
            </List>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
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

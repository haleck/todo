import React, {useState} from 'react';
import classes from "./TodoCreator.module.css"
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";

const TodoCreator = ({todos, setTodos}) => {
    const [newTodo, setNewTodo] = useState('')

    const createTodo = () => {
        setTodos([...todos, {
            "userId": 1,
            "id": todos.length + 1,
            "title": newTodo,
            "completed": false
        }])
        setNewTodo('')
    }

    return (
        <div className={classes.wrapper}>
            <AutoResizeTextarea
                text={newTodo}
                setText={setNewTodo}
                maxLength={1000}
                handleEnter={createTodo}
                placeholder={'Новая задача'}
            />
        </div>
    );
};

export default TodoCreator;
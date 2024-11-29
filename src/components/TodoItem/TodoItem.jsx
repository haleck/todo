import React, {useState} from 'react';
import Checkbox from "../../UI/Checkbox/Checkbox.jsx";
import classes from "./TodoItem.module.css"
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";

const completedTodoTextStyle = {
    textDecoration: 'line-through',
    color: 'grey',

}

const TodoItem = ({todo}) => {
    const [title, setTitle] = useState(todo.title)
    const [completed, setCompleted] = useState(todo.completed)

    const handleCheckboxChange = () => {
        setCompleted(!completed)
    }

    return (
        <div className={classes.wrapper}>
            <Checkbox
                checked={completed}
                onChange={handleCheckboxChange}
                style={{marginTop: 5}}
            />
            <AutoResizeTextarea
                text={title}
                setText={setTitle}
                style={completed ? completedTodoTextStyle : {}}
            />
        </div>
    );
};

export default TodoItem;
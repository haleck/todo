import React, { useState } from 'react';
import Checkbox from "../../UI/Checkbox/Checkbox.jsx";
import classes from "./TaskItem.module.css";
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import tasksStore from "../../store/TasksStore.js";
import { observer } from "mobx-react-lite";

const completedTaskTextStyle = {
    textDecoration: 'line-through',
    color: 'grey',
};

const MoreSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" {...props}>
        <path
            d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
    </svg>
);

const TaskItem = observer(({ task, isOpen, onToggleActionsMenu }) => {
    const [title, setTitle] = useState(task.title);
    const [completed, setCompleted] = useState(task.completed);

    const handleCheckboxChange = () => {
        tasksStore.switchTaskCompleted(task.id);
        setCompleted(!completed);
    };

    const changeTaskTitle = () => {
        tasksStore.changeTaskTitle(task.id, title);
    };

    const handleDelete = () => {
        console.log('Удалить задачу ' + task.id);
    };

    const closeActionsMenu = (event) => {
        if (event.target.closest(`.${classes.actions}`) || event.target.closest(`.${classes.actionsSvg}`)) {
            return;
        }
        onToggleActionsMenu(null);
    };

    React.useEffect(() => {
        document.addEventListener('click', closeActionsMenu);
        return () => {
            document.removeEventListener('click', closeActionsMenu);
        };
    }, []);

    return (
        <div className={classes.wrapper}>
            <Checkbox
                checked={completed}
                onChange={handleCheckboxChange}
                style={{ marginTop: 4 }}
            />
            <AutoResizeTextarea
                text={title}
                setText={setTitle}
                onBlur={changeTaskTitle}
                handleEnter={(ref) => ref.current.blur()}
                maxLength={tasksStore.maxTaskTitleLength}
                style={completed ? completedTaskTextStyle : {}}
                disabled={completed}
            />
            <MoreSvg
                style={{ fill: 'var(--main-color)', marginTop: 4, cursor: 'pointer' }}
                height={32}
                className={classes.actionsSvg}
                onClick={() => onToggleActionsMenu(task.id)}
            />
            {isOpen && (
                <div className={classes.actions}>
                    <button onClick={handleDelete}>Удалить</button>
                </div>
            )}
        </div>
    );
});

export default TaskItem;


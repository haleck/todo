import React, {useState} from 'react';
import classes from "./TasksCreator.module.css"
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import tasksStore from "../../store/TasksStore.js";

const TasksCreator = () => {
    const [newTask, setNewTask] = useState('');

    const createTask = () => {
        tasksStore.addTask({
                "userId": 1,
                "id": tasksStore.tasks.length + 1,
                "title": newTask,
                "completed": false
            })
        setNewTask('');
    }

    return (
        <div className={classes.wrapper}>
            <AutoResizeTextarea
                text={newTask}
                setText={setNewTask}
                maxLength={tasksStore.maxTaskTitleLength}
                handleEnter={createTask}
                placeholder={'Новая задача'}
            />
        </div>
    );
};

export default TasksCreator;
import React, {useState} from 'react';
import classes from "./TasksCreator.module.css"
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import tasksStore from "../../store/TasksStore.ts";

const TasksCreator = () => {
    const [newTask, setNewTask] = useState('');
    const [lengthCounterVisible, setLengthCounterVisible] = useState(false)

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
        <>
            <div className={classes.textareaWrapper}>
                <AutoResizeTextarea
                    text={newTask}
                    setText={setNewTask}
                    maxLength={tasksStore.maxTaskTitleLength}
                    handleEnter={createTask}
                    placeholder={'Новая задача'}
                    onFocus={()=>setLengthCounterVisible(true)}
                    onBlur={()=>setLengthCounterVisible(false)}
                />
            </div>
            <div className={`${classes.charCounter} ${lengthCounterVisible ? classes.visible : ''}`}>
                {newTask.length}/{tasksStore.maxTaskTitleLength} символов
            </div>
        </>
    );
};

export default TasksCreator;
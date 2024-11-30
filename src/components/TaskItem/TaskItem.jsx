import React, { useState } from 'react';
import Checkbox from "../../UI/Checkbox/Checkbox.jsx";
import classes from "./TaskItem.module.css";
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import tasksStore from "../../store/TasksStore.ts";
import { observer } from "mobx-react-lite";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import OptionsSvg from "../../UI/Icons/OptionsSvg.jsx";

const completedTaskTextStyle = {
    textDecoration: 'line-through',
    color: 'grey',
};

const TaskItem = observer(({ task, isOpen, onToggleActionsMenu }) => {
    const [title, setTitle] = useState(task.title);
    const [completed, setCompleted] = useState(task.completed);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCheckboxChange = () => {
        tasksStore.switchTaskCompleted(task.id);
        setCompleted(!completed);
    };

    const changeTaskTitle = () => {
        tasksStore.changeTaskTitle(task.id, title);
    };

    const handleDelete = () => {
        tasksStore.deleteTask(task.id);
        setShowConfirmation(false);
    };

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
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
        <>
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
                <OptionsSvg
                    style={{ fill: 'var(--main-color)', marginTop: 4, cursor: 'pointer' }}
                    height={32}
                    className={classes.actionsSvg}
                    onClick={() => onToggleActionsMenu(task.id)}
                />
                {isOpen && (
                    <div className={classes.actions}>
                        <button onClick={handleDeleteClick}>Удалить</button>
                    </div>
                )}
            </div>
            {showConfirmation && (
                <ConfirmationModal
                    title="Подтверждение удаления"
                    message={`Вы уверены, что хотите удалить задачу "${title}"?`}
                    onConfirm={handleDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </>
    );
});

export default TaskItem;



import React, {useEffect, useRef} from 'react';
import TaskItem from "../TaskItem/TaskItem.jsx";
import classes from "./TasksList.module.css"
import tasksStore from "../../store/TasksStore.js";
import {observer} from "mobx-react-lite";
import {reaction} from "mobx";

const TasksList = observer(() => {
    const listRef = useRef(null);

    const updatePadding = () => {
        const listElement = listRef.current;
        if (listElement) {
            const hasScrollbar = listElement.scrollHeight > listElement.clientHeight;

            if (hasScrollbar) {
                listElement.style.paddingRight = '10px';
            } else {
                listElement.style.paddingRight = '0';
            }
        }
    };

    useEffect(() => {
        let timer
        const disposer = reaction(
            () => tasksStore.tasks.length,
            () => {
                // Таймер нужен для учета асинхронности обновления DOM дерева, иначе отступ не будет добавляться
                // при появлении первого элемента, создающего scrollbar, по условию из updatePadding()
                timer = setTimeout(updatePadding, 50);
            }
        );

        return () => {
            clearTimeout(timer);
            disposer();
        }
    }, []);

    return (
        <div ref={listRef} className={classes.todoList}>
            {tasksStore.tasks.map((task) =>
                <TaskItem
                    key={task.id}
                    task={task}
                />
            )}
        </div>
    );
});

export default TasksList;
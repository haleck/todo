import React, { useEffect, useRef, useState } from 'react';
import TaskItem from "../TaskItem/TaskItem.jsx";
import classes from "./TasksList.module.css"
import tasksStore from "../../store/TasksStore.js";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";

const TasksList = observer(() => {
    const listRef = useRef(null);
    const [openTaskId, setOpenTaskId] = useState(null);
    const [extraPadding, setExtraPadding] = useState(0);
    const scrollTimerRef = useRef(null);

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
        let timer;
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
        };
    }, []);

    useEffect(() => {
        return () => {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
        };
    }, []);

    const scrollOnLastTask = async () => {
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }

        scrollTimerRef.current = setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        }, 50);

        setTimeout(updatePadding, 50);
    }

    const handleToggleActionsMenu = (taskId) => {
        setOpenTaskId((prevId) => {
            if (prevId === taskId) {
                setExtraPadding(0);
                return null;
            }

            // Это сделано для того, чтобы при открытии меню действий у последнего элемента - оно отображалось без
            // создания ненужной полосы прокрутки
            const isLastTask = tasksStore.tasks[tasksStore.tasks.length - 1]?.id === taskId;
            if (isLastTask) {
                setExtraPadding(50);
                scrollOnLastTask()
            } else {
                setExtraPadding(0);
            }

            return taskId;
        });
    };

    return (
        <div
            ref={listRef}
            className={classes.todoList}
            style={{ paddingBottom: extraPadding }}
        >
            {tasksStore.tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isOpen={openTaskId === task.id}
                    onToggleActionsMenu={handleToggleActionsMenu}
                />
            ))}
        </div>
    );
});

export default TasksList;
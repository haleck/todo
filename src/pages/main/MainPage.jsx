import React from 'react';
import classes from "./MainPage.module.css";
import TasksList from "../../components/TasksList/TasksList.jsx";
import TasksCreator from "../../components/TasksCreator/TasksCreator.jsx";
import PinSvg from "../../UI/Icons/PinSvg.jsx"

const MainPage = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <span>ToDo App</span>
                    <PinSvg style={{width: 35, height: 35}} />
                </div>
                <TasksCreator />
                <TasksList />
            </div>
        </div>
    );
};

export default MainPage;
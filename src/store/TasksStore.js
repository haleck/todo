import { makeAutoObservable } from "mobx";

class TasksStore {
    tasks = [
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
    ];
    maxTaskTitleLength = 300

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task) {
        task.title.length > 0 &&
        this.tasks.push(task);
    }

    switchTaskCompleted(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }

    changeTaskTitle(taskId, newTitle) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.title = newTitle
        }
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}

const tasksStore = new TasksStore();
export default tasksStore;
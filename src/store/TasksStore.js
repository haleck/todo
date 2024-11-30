import { action, makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class TasksStore {
    tasks = [];
    maxTaskTitleLength = 300;
    error = null;

    _apiUrl = "https://jsonplaceholder.typicode.com/todos/"

    constructor() {
        makeAutoObservable(this);
    }

    async performRequest(apiCall, successCallback) {
        this.error = null;

        try {
            const response = await apiCall();

            runInAction(() => {
                successCallback(response);
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });

            console.error("Ошибка при выполнении API запроса:", error);
        }
    }

    fetchTasks() {
        return this.performRequest(
            () => axios.get(this._apiUrl, { params: { _limit: 10 } }),
            (response) => {
                this.tasks = response.data;
            }
        );
    }

    addTask(task) {
        if (task.title.length === 0) return;

        return this.performRequest(
            () => axios.post(this._apiUrl, task),
            (response) => {
                this.tasks.push({ ...response.data, id: Date.now() });
            }
        );
    }

    switchTaskCompleted(taskId) {
        const task = this.tasks.find((task) => task.id === taskId);
        if (!task) return;

        return this.performRequest(
            () =>
                axios.patch(`${this._apiUrl}${taskId}`, {
                    completed: !task.completed,
                }),
            () => {
                task.completed = !task.completed;
            }
        );
    }

    changeTaskTitle(taskId, newTitle) {
        const task = this.tasks.find((task) => task.id === taskId);
        if (!task || newTitle.length === 0) return;

        return this.performRequest(
            () =>
                axios.patch(`${this._apiUrl}${taskId}`, {
                    title: newTitle,
                }),
            () => {
                task.title = newTitle;
            }
        );
    }

    deleteTask(taskId) {
        return this.performRequest(
            () => axios.delete(`${this._apiUrl}${taskId}`),
            () => {
                this.tasks = this.tasks.filter((task) => task.id !== taskId);
            }
        );
    }
}

const tasksStore = new TasksStore();
export default tasksStore;
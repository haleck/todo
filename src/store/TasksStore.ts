import {makeAutoObservable, runInAction} from "mobx";
import axios, { AxiosResponse } from "axios";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

class TasksStore {
    tasks: Task[] = [];
    maxTaskTitleLength: number = 300;
    error: string | null = null;

    private _apiUrl: string = "https://jsonplaceholder.typicode.com/todos/";

    constructor() {
        makeAutoObservable(this);
    }

    private async performRequest<T>(
        apiCall: () => Promise<AxiosResponse<T>>,
        successCallback: (response: AxiosResponse<T>) => void
    ): Promise<void> {
        this.error = null;

        try {
            const response = await apiCall();
            runInAction(() => {
                successCallback(response);
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message;
            });

            console.error("Ошибка при выполнении API запроса:", error);
        }
    }

    fetchTasks(): Promise<void> {
        return this.performRequest<Task[]>(
            () => axios.get<Task[]>(this._apiUrl, { params: { _limit: 10 } }),
            (response) => {
                this.tasks = response.data;
            }
        );
    }

    addTask(task: Task): Promise<void> {
        if (task.title.length === 0) return Promise.resolve();

        return this.performRequest(
            () => axios.post<Task>(this._apiUrl, task),
            (response) => {
                this.tasks.push({ ...response.data, id: Date.now() });
            }
        );
    }

    switchTaskCompleted(taskId: number): Promise<void> {
        const task = this.tasks.find((task) => task.id === taskId);
        if (!task) return Promise.resolve();

        return this.performRequest(
            () =>
                axios.patch(this._apiUrl + taskId, {
                    completed: !task.completed,
                }),
            () => {
                task.completed = !task.completed;
            }
        );
    }

    changeTaskTitle(taskId: number, newTitle: string): Promise<void> {
        const task = this.tasks.find((task) => task.id === taskId);
        if (!task || newTitle.length === 0) return Promise.resolve();

        return this.performRequest(
            () =>
                axios.patch(this._apiUrl + taskId, {
                    title: newTitle,
                }),
            () => {
                task.title = newTitle;
            }
        );
    }

    deleteTask(taskId: number): Promise<void> {
        return this.performRequest(
            () => axios.delete(this._apiUrl + taskId),
            () => {
                this.tasks = this.tasks.filter((task) => task.id !== taskId);
            }
        );
    }
}

const tasksStore = new TasksStore();
export default tasksStore;
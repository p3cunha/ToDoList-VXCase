import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task } from "../../model/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskState {

    private _taskList$ = new BehaviorSubject<Task[]>(null);
    get taskList$() {
        return this._taskList$.asObservable();
    }
    get taskList() {
        return this._taskList$.getValue();
    }
    set taskList(tasks: Task[]) {
        this._taskList$.next(tasks);
    }

    addTask(task: Task) {
        const currentValue = this.taskList;
        this.taskList = [...currentValue, task];
    }

    editTask(updatedtask: Task) {
        const tasks = this.taskList;
        // const indexOfUpdated = tasks.findIndex(task => task.id === updatedtask.id);
        
        // tasks[indexOfUpdated] = updatedtask;
        // this.taskList = [...tasks];
    }

    updateTaskId(taskToReplace: Task, addedtaskWithId: Task) {
        const tasks = this.taskList;
        const updatedtaskIndex = tasks.findIndex(task => task === taskToReplace);
        tasks[updatedtaskIndex] = addedtaskWithId;
        this.taskList = [...tasks];
    }

    deleteTask(taskRemoved: Task) {
        const currentValue = this._taskList$.getValue();
        this.taskList = currentValue.filter(task => task !== taskRemoved);
    }

}
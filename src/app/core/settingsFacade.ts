import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { Task } from "../model/task.model";
import { TaskService } from "./service/tasks.service";
import { TaskState } from "./state/tasks.state";

@Injectable({
    providedIn: 'root'
})
export class SettingsFacade {
    constructor(
        private taskState: TaskState,
        private taskService: TaskService,
        private router: Router
    ) { }

    get taskList$() {
        return this.taskState.taskList$;
    }

    loadTaskList() {
        return this.taskService.getTasksList().pipe(
            map(data => this.taskState.taskList = data)
        );
    }

    addTask(task: Task) {
        this.taskState.addTask(task);
        this.taskService.addTask(task)
            .pipe(catchError(async (err) => this.taskState.deleteTask(task)))
            .subscribe(() => this.router.navigateByUrl('/'))
    }

    editTask(task: Task, id) {
        this.taskService.updateTask(id, task)
            .pipe(
                catchError(async (err) => {
                    this.loadTaskList().subscribe();
                    console.log('Não foi possível alterar a tarefa.');
                }))
            .subscribe(() => { this.router.navigateByUrl('/').then(() => this.taskState.editTask(task)) });
    }

    deleteTask(task, id) {
        this.taskState.deleteTask(task);
        return this.taskService.deleteTask(id)
            .pipe(
                catchError(async (err) => {
                    this.loadTaskList().subscribe();
                    console.log('Não foi possível deletar o item.');
                }))
            .subscribe();
    }

}
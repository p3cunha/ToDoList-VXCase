import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  readonly URL = 'http://localhost:3000/tarefas';

  getTasksList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URL)
      .pipe(
        catchError(this.handleError)
      )
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.URL, task)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateTask(id: number, task: Task,): Observable<Task> {
    return this.http.put<Task>(`${this.URL}/${id}`, task)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    console.error('Ops, ocorreu um erro inesperado..');
    return throwError(error);
  }

}

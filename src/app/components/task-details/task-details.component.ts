import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.less']
})
export class TaskDetailsComponent implements OnInit {
  public form: FormGroup;
  private taskId: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.setForm();
    this.getTask();
  }

  setForm(): void {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  getTask(): void {
    this.route.params.subscribe(param => this.taskId = param.id);
    if (this.taskId)
    this.taskService.getTaskById(this.taskId).subscribe((data: Task) => {
      this.form.patchValue({
        title: data.title,
        description: data.description
      })
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  onSubmit(): void  {
    let updateTask = this.taskService.updateTask(this.taskId, this.form.value);
    let addTask = this.taskService.addTask(this.form.value)
    this.taskId ?
    updateTask.subscribe(() => this.router.navigateByUrl('/')) : addTask.subscribe(() => this.router.navigateByUrl('/'));
  }
}

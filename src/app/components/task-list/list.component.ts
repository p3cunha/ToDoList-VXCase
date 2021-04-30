import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/core/service/tasks.service';
import { SettingsFacade } from 'src/app/core/settingsFacade';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        animate('100ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(150)
      ]),
      transition('* => void', [
        animate(70, style({
          transform: 'scale(1)'
        })),
        animate(70, style({
          transform: 'scale(0.5)',
          opacity: 0.5,
        })),
        animate('120ms', style({
          transform: 'scale(0.3)',
          opacity: 0,
        })),
        animate('150ms', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.3s ease')
          ])
        ], { optional: true }
        )
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  public taskList$: Observable<Task[]>;
  public taskList = new Array<Task[]>();


  constructor(
    private router: Router, 
    private taskService: TaskService,
    private settingsFacade: SettingsFacade ) { }

  ngOnInit(): void {
    this.getTaskList();
  }
  
  getTaskList(): void {
    this.settingsFacade.loadTaskList().subscribe()
    this.taskList$ = this.settingsFacade.taskList$;
  }

  navigate(): Promise<boolean> {
    return this.router.navigate([`adicionar-tarefa`]);
  }

  deleteTask(task, id: number): void {
    this.settingsFacade.deleteTask(task, id);
  }
}

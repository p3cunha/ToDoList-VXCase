import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ListComponent } from './components/task-list/list.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: ListComponent },
      { path: 'adicionar-tarefa', component: TaskDetailsComponent },
      { path: 'editar-tarefa/:id', component: TaskDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

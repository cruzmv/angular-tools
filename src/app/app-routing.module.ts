import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalcComponent } from './calc/calc.component';
import { TodoComponent } from './todo/todo.component';
import { GoogleComponent } from './google/google.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'calc', component: CalcComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'google', component: GoogleComponent},
  {path: 'game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
import { FormAlunoComponent } from './form-aluno/form-aluno.component';

export const routes: Routes = [
  { path: '', component: ListaAlunosComponent },
  { path: 'form', component: FormAlunoComponent },
  { path: 'form/:id', component: FormAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

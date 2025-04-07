import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
import { FormAlunoComponent } from './form-aluno/form-aluno.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaAlunosComponent, FormAlunoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'alunos-app';
}

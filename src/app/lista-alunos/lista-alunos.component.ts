import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../models/aluno.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
})
export class ListaAlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  filtro: string = '';

  displayedColumns: string[] = ['nome', 'idade', 'curso', 'periodo', 'acoes'];
  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos();
  }

  editar(id: number): void {
    this.router.navigate(['/form', id]);
  }

  excluir(id: number) {
    const confirmado = confirm('Tem certeza que deseja excluir este aluno?');
    if (confirmado) {
      console.log(id);
      
      this.alunoService.excluir(id);
      this.ngOnInit()
    }
  }

  filtroNome = '';
  ordemAtual: keyof Aluno = 'nome';

ordemCrescente = true;

ordenarPor(campo: keyof Aluno) {
  if (this.ordemAtual === campo) {
    this.ordemCrescente = !this.ordemCrescente;
  } else {
    this.ordemAtual = campo;
    this.ordemCrescente = true;
  }
}


alunosFiltrados(): Aluno[] {
  let lista = this.alunoService.getAlunos();

  if (this.filtro.trim()) {
    lista = lista.filter(a =>
      a.nome.toLowerCase().includes(this.filtro.trim().toLowerCase())
    );
  }

  lista.sort((a, b) => {
    const valorA = a[this.ordemAtual];
    const valorB = b[this.ordemAtual];

    if (valorA < valorB) return this.ordemCrescente ? -1 : 1;
    if (valorA > valorB) return this.ordemCrescente ? 1 : -1;
    return 0;
  });

  return lista;
}

  novo(): void {
    this.router.navigate(['/form']);
  }
}
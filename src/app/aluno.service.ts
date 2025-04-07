import { Injectable } from '@angular/core';

export interface Aluno {
  id: number;
  nome: string;
  idade: number;
  curso: string;
  periodo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private alunos: Aluno[] = [];
  private proximoId = 1;

  getAlunos() {
    return this.alunos;
  }

  adicionar(aluno: Omit<Aluno, 'id'>) {
    this.alunos.push({ id: this.proximoId++, ...aluno });
  }

  atualizar(id: number, aluno: Omit<Aluno, 'id'>) {
    const index = this.alunos.findIndex(a => a.id === id);
    if (index > -1) {
      this.alunos[index] = { id, ...aluno };
    }
  }

  excluir(id: number) {
    this.alunos = this.alunos.filter(a => a.id !== id);
  }

  buscarPorId(id: number): Aluno | undefined {
    return this.alunos.find(a => a.id === id);
  }
}

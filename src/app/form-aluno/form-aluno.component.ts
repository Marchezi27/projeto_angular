import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../models/aluno.model';

@Component({
  selector: 'app-form-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-aluno.component.html',
  styleUrls:['./form-aluno.component.css']
})
export class FormAlunoComponent {
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    idade: new FormControl('', [Validators.required, Validators.min(1)]),
    curso: new FormControl('', Validators.required),
    periodo: new FormControl('', Validators.required),
  });
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alunoService = inject(AlunoService);

  alunoForm!: FormGroup;
  alunoId: number | null = null;
  alunoExistente: Aluno | undefined;

  ngOnInit(): void {
    this.alunoId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.alunoId) {
      this.alunoExistente = this.alunoService.buscarPorId(this.alunoId);
    }

    this.alunoForm = new FormGroup({
      nome: new FormControl(this.alunoExistente?.nome || '', [Validators.required]),
      idade: new FormControl(this.alunoExistente?.idade || '', [Validators.required, Validators.min(1)]),
      curso: new FormControl(this.alunoExistente?.curso || '', [Validators.required]),
      periodo: new FormControl(this.alunoExistente?.periodo || '', [Validators.required]),
    });
  }

  salvar() {
    if (this.alunoForm.valid) {
      const alunoData = this.alunoForm.value as Omit<Aluno, 'id'>;

      if (this.alunoId && this.alunoExistente) {
        this.alunoService.atualizar(this.alunoId, alunoData);
      } else {
        this.alunoService.adicionar(alunoData);
      }

      this.router.navigate(['/']);
    }
  }

  voltar() {
    this.router.navigate(['/']);
  }
}

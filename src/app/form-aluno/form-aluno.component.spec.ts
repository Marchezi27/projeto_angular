import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlunoComponent } from './form-aluno.component';

describe('FormAlunoComponent', () => {
  let component: FormAlunoComponent;
  let fixture: ComponentFixture<FormAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

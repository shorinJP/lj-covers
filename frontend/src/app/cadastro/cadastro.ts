import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterModule, CommonModule, Header],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  mensagem: string = '';
  erro: string = '';
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  cpf: string = '';
  telefone: string = '';

  constructor(public router: Router, private http: HttpClient) {}

  cadastrar() {
    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      confirmarSenha: this.confirmarSenha,
      cpf: this.cpf,
      telefone: this.telefone
    };

    this.http.post<any>('http://localhost:8080/api/usuarios/cadastro', dados).subscribe({
      next: (data) => {
        this.mensagem = 'Cadastro realizado com sucesso! Redirecionando...';
        this.erro = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.erro = err.error?.message || 'Erro ao realizar cadastro.';
        this.mensagem = '';
      }
    });
  }
}
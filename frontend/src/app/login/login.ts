import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, Header, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  senha: string = '';
  mensagem: string = '';

  constructor(public router: Router) {}

  entrar() {
    this.mensagem = 'Login realizado com sucesso! Redirecionando...';
    setTimeout(() => {
      this.router.navigate(['/vitrine']);
    }, 2000);
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  irParaRecuperarSenha() {
    this.router.navigate(['/recuperar-senha']);
  }

  fazerBusca(busca: any) {
    this.router.navigate(['/vitrine'], { queryParams: { busca } });
  }
}
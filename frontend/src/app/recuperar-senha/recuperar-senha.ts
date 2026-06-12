import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-recuperar-senha',
  imports: [RouterModule, Header, FormsModule, CommonModule],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css',
})
export class RecuperarSenha {

  email: string = '';
  mensagem: string = '';
  enviado: boolean = false;
  erro: string = '';

  constructor(public router: Router, private usuarioService: UsuarioService) {}

  enviar() {
    if (!this.email) return;
    this.erro = '';

    this.usuarioService.recuperarSenha(this.email).subscribe({
      next: (resposta) => {
        console.log('Resposta:', resposta); // para debug
        this.mensagem = `Nova senha enviada para ${this.email}. Verifique sua caixa de entrada.`;
        this.enviado = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        console.log('Erro:', err); // para debug
        this.erro = err.error?.mensagem || 'Email não encontrado.';
      }
    });
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
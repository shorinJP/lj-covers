import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato',
  imports: [FormsModule, CommonModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  mensagem: string = '';
  titulo: string = '';
  nome: string = '';
  telefone: string = '';
  email: string = '';
  texto: string = '';
  copia: boolean = false;

  enviar(): void {
    if (!this.nome || !this.email || !this.texto) {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    const corpoMensagem =
      `titulo=${this.titulo}, nome=${this.nome}, ` +
      `email=${this.email}, copia=${this.copia}, ` +
      `telefone=${this.telefone}, texto=${this.texto}`;
    localStorage.setItem('mensagemContato', corpoMensagem);
    this.mensagem = 'Sua mensagem foi enviada com sucesso!';
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.texto = '';
    this.titulo = '';
    this.copia = false;
  }
}

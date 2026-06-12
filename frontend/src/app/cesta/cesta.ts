import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-cesta',
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class Cesta implements OnInit {

  itens: ItemCesta[] = [];
  total: number = 0;
  mensagem: string = '';
  erro: string = '';

  constructor(public router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarCesta();
  }

  fazerBusca(busca: any) {
    if (busca && busca.trim() !== '') {
      this.router.navigate(['/vitrine'], { queryParams: { busca } });
    } else {
      this.router.navigate(['/vitrine']);
    }
  }

  carregarCesta() {
    const dados = localStorage.getItem('cesta');
    this.itens = dados ? JSON.parse(dados) : [];
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0);
  }

  limparCesta() {
    localStorage.removeItem('cesta');
    this.itens = [];
    this.total = 0;
  }

  finalizar() {
    if (this.itens.length === 0) return;

    this.http.post<any>('http://localhost:8080/api/pedidos/finalizar', this.itens).subscribe({
      next: (data) => {
        this.mensagem = 'Compra finalizada com sucesso! Obrigado(a)!';
        this.erro = '';
        this.limparCesta();
        setTimeout(() => {
          this.mensagem = '';
          this.router.navigate(['/vitrine']);
        }, 2500);
      },
      error: (err) => {
        this.erro = err.error?.message || 'Erro ao finalizar compra. Tente novamente.';
      }
    });
  }

  continuarComprando() {
    this.router.navigate(['/vitrine']);
  }

  aumentar(item: ItemCesta) {
    item.quantidade += 1;
    this.salvarCesta();
  }

  diminuir(item: ItemCesta) {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
    } else {
      this.itens = this.itens.filter(i => i.produto.codigo !== item.produto.codigo);
    }
    this.salvarCesta();
  }

  salvarCesta() {
    localStorage.setItem('cesta', JSON.stringify(this.itens));
    this.calcularTotal();
  }

  irParaVitrine() {
    this.router.navigate(['/vitrine']);
  }
}

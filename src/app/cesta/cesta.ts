import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-cesta',
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class Cesta implements OnInit {

  itens: any[] = [];
  total: number = 0;

  constructor(public router: Router){
  }

  ngOnInit(): void {
    this.carregarCesta();
  }

  fazerBusca(busca: any) {
    this.router.navigate(['/vitrine'], { queryParams: { busca } });
  }

  carregarCesta() {
    const dados = localStorage.getItem('cesta');
    this.itens = dados ? JSON.parse(dados) : [];
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itens.reduce((acc, item) => acc + item.valor * item.qtd, 0);
  }

  limparCesta() {
    localStorage.removeItem('cesta');
    this.itens = [];
    this.total = 0;
  }

  finalizar() {
    alert('Compra finalizada! Obrigada.');
    this.limparCesta();
  }

  aumentar(item: any) {
    item.qtd += 1;
    this.salvarCesta();
  }

  diminuir(item: any) {
    if (item.qtd > 1) {
      item.qtd -= 1;
    } else {
      this.itens = this.itens.filter(i => i.codigo !== item.codigo); // remove se chegar em 0
    }
    this.salvarCesta();
  }

  salvarCesta() {
    localStorage.setItem('cesta', JSON.stringify(this.itens));
    this.calcularTotal();
  }
}

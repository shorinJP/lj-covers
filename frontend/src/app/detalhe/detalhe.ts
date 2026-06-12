import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Router, RouterModule } from '@angular/router';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  imports: [Header, RouterModule, CommonModule],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe implements OnInit {

  constructor(public router: Router) {}

  public detalhe!: Produto;

  ngOnInit(): void {
    this.detalhe = JSON.parse(localStorage.getItem('selecionado')!);
  }

  irParaCesta() {
    const dados = localStorage.getItem('cesta');
    let cesta: any[] = dados ? JSON.parse(dados) : [];
    const existe = cesta.find(i => i.produto?.codigo === this.detalhe.codigo);
    if (existe) {
      existe.quantidade += 1;
    } else {
      cesta.push({ produto: this.detalhe, quantidade: 1, valor: this.detalhe.valor });
    }
    localStorage.setItem('cesta', JSON.stringify(cesta));
    this.router.navigate(['/cesta']);
  }

  fazerbusca(busca: any) {
    if (busca && busca.trim() !== '') {
      this.router.navigate(['/vitrine'], { queryParams: { busca } });
    } else {
      this.router.navigate(['/vitrine']);
    }
  }
}
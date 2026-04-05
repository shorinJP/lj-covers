import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { PreloadAllModules, Router, RouterModule } from '@angular/router';
import { Produto } from '../vitrine/vitrine';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  imports: [Header, RouterModule, CommonModule],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe implements OnInit {

  constructor(public router: Router){
  
  }

  public detalhe!: Produto;

  ngOnInit(): void {
    this.detalhe = JSON.parse(localStorage.getItem('selecionado')!);
  }

  irParaCesta() {
    const dados = localStorage.getItem('cesta');
    let cesta: any[] = dados ? JSON.parse(dados) : [];

    const existe = cesta.find(i => i.codigo === this.detalhe.codigo);
    if (existe) {
      existe.qtd += 1;
    } else {
      cesta.push({ ...this.detalhe, qtd: 1 });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));
    this.router.navigate(['/cesta']);
  }

  fazerbusca(busca: any) {
    this.router.navigate(['/vitrine'], { queryParams : {
    busca } });
  }


}

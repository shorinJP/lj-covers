import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

export interface Produto {
  codigo: number;
  nome: string;
  descritivo: string;
  valor: number;
  quantidade: number;
}

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule, Header, RouterModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {

  lista: Produto[] = [
    {
      "codigo": 1,
      "nome": "exemplo1",
      "descritivo": "exemplo1",
      "valor": 0.0,
      "quantidade": 15
    },
    {
      "codigo": 2,
      "nome": "exemplo2",
      "descritivo": "exemplo2",
      "valor": 0.0,
      "quantidade": 20
    },
    {
      "codigo": 3,
      "nome": "exemplo3",
      "descritivo": "exemplo3",
      "valor": 0.0,
      "quantidade": 30
    },
    {
      "codigo": 4,
      "nome": "exemplo4",
      "descritivo": "exemplo4",
      "valor": 0.0,
      "quantidade": 25
    },
    {
      "codigo": 5,
      "nome": "exemplo5",
      "descritivo": "exemplo5",
      "valor": 0.0,
      "quantidade": 10
    },
    {
      "codigo": 6,
      "nome": "exemplo6",
      "descritivo": "exemplo6",
      "valor": 0.0,
      "quantidade": 40
    },
    {
      "codigo": 7,
      "nome": "exemplo7",
      "descritivo": "exemplo7",
      "valor": 0.0,
      "quantidade": 50
    },
    {
      "codigo": 8,
      "nome": "exemplo8",
      "descritivo": "exemplo8",
      "valor": 0.0,
      "quantidade": 12
    },
    {
      "codigo": 9,
      "nome": "exemplo9",
      "descritivo": "exemplo9",
      "valor": 0.0,
      "quantidade": 28
    },
    {
      "codigo": 10,
      "nome": "exemplo10",
      "descritivo": "exemplo10",
      "valor": 0.0,
      "quantidade": 18
    }
  ]

  busca: any = '';

  constructor(private route: ActivatedRoute, public router: Router) {

    this.busca = this.route.snapshot.queryParamMap.get('busca');

    if (this.busca) {
      this.fazerBusca(this.busca);
    }
  }

  fazerBusca(event: any) {
    this.busca = event;
    this.lista = this.lista.filter((item) => item.nome.toLowerCase().includes(event.toLowerCase()));
  }

  irParaDetalhe(item: any) {
    localStorage.setItem('selecionado', JSON.stringify(item))
    this.router.navigate(['/detalhe']);
  }

  irParaCesta(obj: any) {
    const dados = localStorage.getItem('cesta');
    let cesta: any[] = dados ? JSON.parse(dados) : [];

    const existe = cesta.find(i => i.codigo === obj.codigo);
    if (existe) {
      existe.qtd += 1;
    } else {
      cesta.push({ ...obj, qtd: 1 });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));
    alert(`"${obj.nome}" adicionado à cesta!`);
    this.router.navigate(['/cesta']);
  }
}

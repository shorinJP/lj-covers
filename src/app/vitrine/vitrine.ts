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
      "nome": "Tim Maia 1972",
      "descritivo": "Seu terceiro albúm com 12 faixas onde ele embeleza e nos mostra o que realmente é MPB",
      "valor": 400.0,
      "quantidade": 3
    },
    {
      "codigo": 2,
      "nome": "Queen: News of de World 1977",
      "descritivo": "Considerado por muitos o melhor albúm da banda, contendo 11 faixas sendo uma delas 'We Are The Champions'. Isso é Rock!",
      "valor": 290.0,
      "quantidade": 8
    },
    {
      "codigo": 3,
      "nome": "Queen: A Night at the Opera 1975",
      "descritivo": "Mistura rock, ópera, baladas e pop. Teve produção cara e sofisticada para a época. Com 12 faixas, 'Bohemian Rhapsody' sendo a mais conhecida",
      "valor": 250.0,
      "quantidade": 20
    },
    {
      "codigo": 4,
      "nome": "Creed: The Best Of Creed 2025",
      "descritivo": "Um disco onde se reúne o melhor do Creed. Isso é Slow Rock",
      "valor": 300.0,
      "quantidade": 10
    },
    {
      "codigo": 5,
      "nome": "BMTH: That`s the Ispirit 2015",
      "descritivo": "BMTH se renova nesse albúm em uma pegada mais pop mas sem deixar o Rock de lado com 11 faixas, com 'Follow You' sendo a melhor",
      "valor": 280.0,
      "quantidade": 5
    },
    {
      "codigo": 6,
      "nome": "BMTH: Sempiternal 2013",
      "descritivo": "BMTH na sua maior essência, o puro Trash Metal, com 11 faixas sendo 'Can You Fell My Heart' a mais famosa",
      "valor": 300.0,
      "quantidade": 8
    },
    {
      "codigo": 7,
      "nome": "Rita Lee (Remastered) 1979",
      "descritivo": "Rita Lee vem com esse album revolucionando o POP brasileiro, com 08 faixas, 'Mania de Você' sendo a mais famosa ",
      "valor": 260,
      "quantidade": 7
    },
    {
      "codigo": 8,
      "nome": "Chico Buarque 1987",
      "descritivo": "Com 11 faixas Chico trás um novo ar para o MPB, com 'Cálice' e 'Apesar de Você' parando no ouvido de todos nos anos 80-90",
      "valor": 300.0,
      "quantidade": 1
    },
    {
      "codigo": 9,
      "nome": "Charlie Brown Jr.: Abalando sua Fábrica 2001",
      "descritivo": "Com seu estilo musical único, eles trazem o Punk Rock e Hardcore melódico em 12 faixas, 'Lugar ao Sol' sendo a mais conhecida",
      "valor": 200.0,
      "quantidade": 1
    },
    {
      "codigo": 10,
      "nome": "Bob Marley: The Best of Bob Marley 1984",
      "descritivo": "Um albúm onde junta tudo de melhor da lenda Jamaicana em 16 faixas contendo 'Is This Love', 'No Woman, No Cry' e 'Could You Be Loved'",
      "valor": 180.0,
      "quantidade": 2
    },
    {
      "codigo": 11,
      "nome": "Tyler, The Creator: Igor 2019",
      "descritivo": "Igor considerado por grande parte do seu público o melhor albúm do cantor, onde mistura RAP, JAZZ, FUNK, GOSPEL. Tendo 12 faixar com 'Earfquake' sendo a mais famosa",
      "valor": 250.0,
      "quantidade": 6
    },
    {
      "codigo": 12,
      "nome": "Toca-discos Crosley Keepsake",
      "descritivo": "Um toca disco(vitrola) simples, porém muito elegante",
      "valor": 800.0,
      "quantidade": 5
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

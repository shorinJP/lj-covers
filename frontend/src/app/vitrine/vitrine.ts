import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Header } from '../header/header';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule, Header, RouterModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit, AfterViewInit {
  @ViewChild(Header) header!: Header;

  lista: Produto[] = [];
  listaBusca: Produto[] = [];
  busca: string = '';
  mensagem: string = '';

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarProdutos();
    }
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.busca = params['busca'] || '';
      if (this.busca && this.busca.trim() !== '') {
        this.fazerBuscaApi(this.busca);
      }
    });
  }

  carregarProdutos(): void {
    this.service.listarTodos().subscribe({
      next: (data) => {
        this.lista = data.data || [];
        this.listaBusca = this.lista;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos', err);
        this.mensagem = 'Erro ao carregar produtos do servidor.';
      },
    });
  }

  fazerBuscaApi(termo: string): void {
    this.service.fazerBusca(termo).subscribe({
      next: (data) => {
        this.listaBusca = data.data || [];
        this.mensagem =
          this.listaBusca.length === 0
            ? 'Nenhum produto encontrado para: ' + termo
            : 'Resultados para: ' + termo;
      },
      error: (err) => console.error('Erro na busca', err),
    });
  }

  fazerBusca(event: any): void {
    this.busca = event;
    this.listaBusca = this.lista.filter((item) =>
      item.nome.toLowerCase().includes(event.toLowerCase())
    );
  }

  limparBusca(): void {
    this.listaBusca = this.lista;
    this.busca = '';
    if (this.header) this.header.limparInput();
  }

  irParaDetalhe(item: Produto): void {
    localStorage.setItem('selecionado', JSON.stringify(item));
    this.router.navigate(['/detalhe']);
  }

  irParaCesta(obj: Produto): void {
    const dados = localStorage.getItem('cesta');
    let cesta: ItemCesta[] = dados ? JSON.parse(dados) : [];
    const existe = cesta.find((i) => i.produto.codigo === obj.codigo);
    if (existe) {
      existe.quantidade += 1;
    } else {
      const item = new ItemCesta();
      item.produto = obj;
      item.quantidade = 1;
      item.valor = obj.valor;
      cesta.push(item);
    }
    localStorage.setItem('cesta', JSON.stringify(cesta));
    alert(`"${obj.nome}" adicionado à cesta!`);
    this.router.navigate(['/cesta']);
  }
}
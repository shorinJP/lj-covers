import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) {}

  public carregarVitrine(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/destaques`);
  }

  public listarTodos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public carregar(codigo: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${codigo}`);
  }

  public fazerBusca(termo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/busca?termo=${termo}`);
  }

  public gravar(obj: Produto): Observable<any> {
    return this.http.post<any>(this.apiUrl, obj);
  }
}

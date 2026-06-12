import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private api = 'http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any> {
    return this.http.get(this.api);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  buscarPorTermo(termo: string): Observable<any> {
    return this.http.get(`${this.api}/busca?termo=${termo}`);
  }

  buscarDestaques(): Observable<any> {
    return this.http.get(`${this.api}/destaques`);
  }
}
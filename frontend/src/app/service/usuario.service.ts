import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  public recuperarSenha(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar-senha`, { email });
  }
}
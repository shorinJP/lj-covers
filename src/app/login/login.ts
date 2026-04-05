import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-login',
  imports: [RouterModule, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(public router: Router) {
  }
  
  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  fazerBusca(busca: any) {
    this.router.navigate(['/vitrine'], { queryParams: { busca } });
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() buscar = new EventEmitter();
  busca: string = '';

  constructor(public router: Router) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  onBuscar() {
    this.buscar.emit(this.busca);
  }

  limparInput() {
    this.busca = '';
  }
}
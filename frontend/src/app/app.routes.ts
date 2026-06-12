import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';
import { Detalhe } from './detalhe/detalhe';
import { Cesta } from './cesta/cesta';
import { RecuperarSenha } from './recuperar-senha/recuperar-senha';
import { Contato } from './contato/contato';

export const routes: Routes = [
  { path: '', component: Vitrine },
  { path: 'vitrine', component: Vitrine },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login },
  { path: 'detalhe', component: Detalhe },
  { path: 'cesta', component: Cesta },
  { path: 'recuperar-senha', component: RecuperarSenha },
  { path: 'contato', component: Contato },
  { path: 'fale-conosco', component: Contato },
];

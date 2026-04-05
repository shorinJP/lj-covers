import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';
import { Detalhe } from './detalhe/detalhe';
import { Cesta } from './cesta/cesta';

export const routes: Routes = [
    { path: "cadastro", component: Cadastro },
    { path: "vitrine", component: Vitrine },
    { path: "login", component: Login },
    { path: "detalhe", component: Detalhe },
    { path: "cesta", component: Cesta },
    { path: "", component: Vitrine }
];

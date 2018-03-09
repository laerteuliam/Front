import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { ProdutosComponent } from './secure/produtos/produtos.component';
import { AppComponent } from './app.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'produtos',
                component: ProdutosComponent
            }
        ]
    }
]

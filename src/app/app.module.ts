import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { ProdutosComponent } from './secure/produtos/produtos.component';
import { LoginComponent } from './public/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTokenInterceptor } from './core/services/autenticacao.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientTokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class AppModule { }

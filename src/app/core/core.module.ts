import { ProdutoService } from './services/produto.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from './services/autenticacao.service';
import { HttpClientModule } from '@angular/common/http';
import { MensagemService } from './services/common/mensagem.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:[AutenticacaoService,ProdutoService,MensagemService]
})
export class CoreModule { }

import { ProdutoDto } from './../../core/dtos/produtoDto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../core/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos:Array<ProdutoDto>;
  constructor(private _produtoService: ProdutoService) { }

  ngOnInit() {
    this._produtoService.get()
      .subscribe(x => {
        this.produtos = x;
      }
      );
  }

}

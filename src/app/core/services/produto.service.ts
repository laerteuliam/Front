import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ProdutoDto } from '../dtos/produtoDto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoService extends BaseService<ProdutoDto> {
  uri: string = '/produto';

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
}

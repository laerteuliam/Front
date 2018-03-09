import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { MensagemService } from './common/mensagem.service';
import { Router } from '@angular/router';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../environments/environment';



export interface ISessao {
  id: string;
  nome: string;
  access_token: string;
}

export interface IEntrar {
  usuario: string;
  senha: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
      private _httpClient: HttpClient) { }

  get sessao(): ISessao {
      return <ISessao>JSON.parse(localStorage.getItem('sessao'));
  }

  get autenticado(): boolean {
      return !!this.sessao;
  }

  set sessao(sessao: ISessao) {
      localStorage.setItem('sessao', JSON.stringify(sessao));
  }

  sair() {
      localStorage.removeItem("sessao");
  }

  logar(usuario,senha): Observable<boolean> {
      let parametros = new HttpParams()
          .set('username', usuario)
          .set('password', senha)
          .set('grant_type', 'password');

      let header = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded');

      return this._httpClient
          .post<ISessao>('/login', parametros.toString(), {
              headers: header
          }).map((sessao) => {
              if (sessao.access_token) {
                  this.sessao = sessao;
                  return true;
              }
              return false;
          });
  }
}

@Injectable()
export class HttpClientTokenInterceptor implements HttpInterceptor {
  private autenticacaoService: AutenticacaoService;
  private mensagemService: MensagemService;

  constructor(
      private injector: Injector,
      private router: Router) { }

  intercept(
      req: HttpRequest<any>,
      next: HttpHandler
  ): Observable<| HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    
    this.autenticacaoService = this.injector.get(AutenticacaoService);
      this.mensagemService = this.injector.get(MensagemService);

      let update: any = {
          url: `${environment.api}${req.url}`
      };

      if (req.url != '/login' && this.autenticacaoService.autenticado) {
          update.setHeaders = {
              Authorization: `Bearer ${this.autenticacaoService.sessao.access_token}`
          };
      }

      req = req.clone(update);

      return next.handle(req)
          .catch((error: HttpErrorResponse, caught) => {
              return this.handleError(error);
          });
  }

  private handleError = (response: HttpErrorResponse): ErrorObservable => {

      var erro = response.error.error_description || response.error.message || response.message || response.statusText;

      switch (response.status) {
          case 404: //NotFound
              this.mensagemService.aviso('página não encontrada');
              this.router.navigate(['/']);
              break;
          case 401: //Unauthorized
          case 403: //Forbidden				
              this.mensagemService.aviso('Você não tem acesso a esta página ou sua sessão expirou.');
              this.router.navigate(['/']);
              break;
          case 0:
              this.mensagemService.aviso('A API não está ativa!');
              break;
          case 500:
              break;
          default:
              break;
      }

      
      return new ErrorObservable(erro);
  }
}
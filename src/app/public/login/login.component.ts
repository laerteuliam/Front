import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensagemService } from '../../core/services/common/mensagem.service'
import { AutenticacaoService } from '../../core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.formBuilder.group({
    usuario: [null, [Validators.required]],
    senha: [null, [Validators.required]]
  });

  constructor(
    private _authenticationService: AutenticacaoService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _mensagemService: MensagemService
  ) { }

  ngOnInit() {
  }

  submit() {
    let usuario = this.formLogin.get('usuario').value;
    let senha = this.formLogin.get('senha').value;
    this._authenticationService.logar(usuario, senha)
      .subscribe(authenticated => {
        if (authenticated) {
          this._router.navigate(['/produtos']);
        }
      }, () => {
        this._mensagemService.aviso('Credenciais inválidas');
      })
  }
}

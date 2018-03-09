import { Injectable } from '@angular/core';

@Injectable()
export class MensagemService {

    constructor() { }

    aviso(texto: string) {
        alert(texto);
    };

    sucesso(texto: string) {
        alert(texto);
    }

    erro(texto: string) {
        alert(texto);
    }
}

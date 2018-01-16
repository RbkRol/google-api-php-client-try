import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuardService implements CanActivate{

  constructor() { }

  canActivate() {
    const usuario = JSON.parse(sessionStorage.getItem('usuarioActual'));
    if (usuario && usuario.name !== null) {
      return true;
    } else {
      alert('usuario y/o contraseña incorrectas!');
    }
    return false;
  }
}

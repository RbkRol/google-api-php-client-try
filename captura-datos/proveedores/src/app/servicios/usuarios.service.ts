import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../inicio-sesion/usuario";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuariosService {
  correo: string;

  constructor(private http: HttpClient) { }

  public getUsers(correo:string, password:string) {
    return this.http.get('http://localhost:8082/php/validarUsuario.php/?correo='+correo+'&password='+ password);
  }
  public getPass(correo: string){
    return this.http.get('http://localhost:8082/php/recuperarpass.php/?correo='+correo);
  }
}

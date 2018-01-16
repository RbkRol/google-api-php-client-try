import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LayoutService {

  constructor(private http: HttpClient) { }
  public getServAux() {
    return this.http.get('https://fuentesexternasproveedores-dot-gnp-fuentes-ext-proveedores.appspot.com/php/layoutSA.php');
  }

  public getCPM() {
    return this.http.get('https://fuentesexternasproveedores-dot-gnp-fuentes-ext-proveedores.appspot.com/php/layoutCPM.php');
  }

  public getATC(){
    return this.http.get('https://fuentesexternasproveedores-dot-gnp-fuentes-ext-proveedores.appspot.com/php/layoutATC.php');
  }
}

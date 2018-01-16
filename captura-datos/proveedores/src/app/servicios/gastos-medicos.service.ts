import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {GastosMedicos} from '../captura-datos/gastosMedicos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GastosMedicosService {

  constructor(private http: HttpClient) { }

  public enviarInforme(gasto: GastosMedicos) {
    this.transforma(gasto);
    return this.http.post('https://backend-dot-gnp-fuentes-ext-proveedores.appspot.com/subirArchivo', this.transforma(gasto));
  }
  private transforma(datos: any): FormData{
    let formData:FormData = new FormData();
    formData.append("lineaNegocio",datos.lineaNegocio);
    formData.append("tipoArchivo",datos.tipoArchivo);
    formData.append("anio",datos.anio);
    formData.append("mes",datos.mes);
    formData.append("archivo",datos.archivo);
    return formData;
  }
  public agregarDatos(info: any) {
    return this.http.post('http://localhost/php/insertarDatos.php', info);
  }

}

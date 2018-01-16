import {Component, OnInit, OnDestroy} from '@angular/core';
import {GastosMedicos} from "./gastosMedicos";
import {GastosMedicosService} from "../servicios/gastos-medicos.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {PopArchivoComponent} from "./pops/pop-archivo/pop-archivo.component";
import {PopInformeComponent} from "./pops/pop-informe/pop-informe.component";
import {Router} from '@angular/router';
import {LayoutService} from "../servicios/layout.service";
import {PopErrorComponent} from "./pops/pop-error/pop-error.component";

let fileInput: any;


@Component({
  selector: 'app-captura-datos',
  templateUrl: './captura-datos.component.html',
  styleUrls: ['./captura-datos.component.css']
})
export class CapturaDatosComponent implements OnInit {
  textoAnalizado: any;
  gastos: GastosMedicos;
  loading: boolean;
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  mesEnc=["ENE","FEB","MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  mesDia=["01","02","03","04","05", "06","07","08","09","10","11","12"];
  periodo="MES 0 AL 9";
  referenciaDialogo: MatDialogRef<PopArchivoComponent>;
  referenciaInforme: MatDialogRef<PopInformeComponent>;
  referenciaError: MatDialogRef<PopErrorComponent>;
  layoutCargado: any;

  constructor(private gastoServicio: GastosMedicosService, private dialogo: MatDialog, private router: Router, private serviciosAux: LayoutService) {
  }

  ngOnInit() {
    this.gastos = new GastosMedicos();
    var nuevaFecha = new Date();
    //alert(nuevaFecha.getTime());
    var fecha = nuevaFecha.getDate() + " / " + this.meses[nuevaFecha.getMonth()] + " / " + nuevaFecha.getFullYear();
    document.getElementById("fecha").textContent = fecha;
    this.gastos.mes=this.mesDia[nuevaFecha.getMonth()];
    this.gastos.anio=nuevaFecha.getFullYear().toString();
    var sesion = document.getElementById("cerrar-sesion");
    sesion.style.cursor = "pointer";
    if(Number(JSON.parse(sessionStorage.getItem('usuarioActual')).ATC)==1){
      var opcion=document.createElement("option");
      opcion.text="Hospitales (ATC)";
      opcion.value="insumos_medicos";
      var x= document.getElementById('formulario');
      x.appendChild(opcion);
    }
    if(Number(JSON.parse(sessionStorage.getItem('usuarioActual')).CPM)==1){
      var opcion=document.createElement("option");
      opcion.text="Medicamentos (CPM)";
      opcion.value="medicamentos";
      var x= document.getElementById('formulario');
      x.appendChild(opcion);
    }
    if(Number(JSON.parse(sessionStorage.getItem('usuarioActual')).SA)==1){
      var opcion=document.createElement("option");
      opcion.text="Servicios auxiliares";
      opcion.value="servicios_auxiliares";
      var x= document.getElementById('formulario');
      x.appendChild(opcion);
    }
    document.getElementById("sesion").hidden=false;
    document.getElementById("imgS").hidden=false;
    document.getElementById("linea").hidden = false;
    document.getElementById("etiqueta").onclick = function () {
      return false;
    };
  }

  ngOnDestroy() {
    document.getElementById("sesion").hidden=true;
    document.getElementById("imgS").hidden=true;
    document.getElementById("linea").hidden = true;
  }

  fileChangeEvent(entrada: any) {
    try {
      let encabezadosCadena: string;
      let encabezados;
      let encabezadoUTF8;
      let encUTF8;
      fileInput = document.getElementById('file');
      let files = fileInput.files[0];
      let datosArchivo = this.leerArchivo(files);
      datosArchivo.then(texto => {
        let datosArchivo2=this.leerArchivoUTF8(files);
        datosArchivo2.then(textoUTF8=>{
        this.textoAnalizado = texto.toString();
        let textoAnalizado2= textoUTF8.toString();
        encabezadosCadena = this.textoAnalizado.split(/\r\n/);
        encabezadoUTF8=textoAnalizado2.split(/\r\n/);
        if(encabezadosCadena.length>1) {
          if (encabezadosCadena[1].replace(/,/g, "") === "") {
            this.referenciaError = this.dialogo.open(PopErrorComponent, {
              width: "60%",
              data: {
                nombre: files.name
              }
            });
          } else {
            encabezados = (((((encabezadosCadena[0].replace(/, /g, "-")).replace(/\n/g, " "))).replace(/"/g, "")).replace(/  /g, " ")).split(",");
            encUTF8 = (((((encabezadoUTF8[0].replace(/, /g, "-")).replace(/\n/g, " "))).replace(/"/g, "")).replace(/  /g, " ")).split(",");
            if (this.analizarContenido(encabezados, encUTF8)) {
              this.gastos.archivo = files;
              this.referenciaDialogo = this.dialogo.open(PopArchivoComponent, {
                width: "60%",
                data: {
                  nombre: files.name
                }
              });
              var etiqueta = document.getElementById('columna');
              etiqueta.innerHTML = '<div class="row"><div class="col-md-8">' + files.name + '</div><div class="col-md-4"><P ALIGN="RIGHT"><span class="glyphicon glyphicon-trash" id="agrega" aria-hidden="true"></span></P> </div></div>';
              document.getElementById('agrega').addEventListener('click', this.eliminaElemento.bind(this));
              document.getElementById('agrega').style.cursor = "pointer";
              document.getElementById('agrega').style.fontSize = "16px";
              this.verificarEstadoElementos();
            } else {
              this.referenciaError = this.dialogo.open(PopErrorComponent, {
                width: "60%",
                data: {
                  nombre: files.name
                }
              });
            }
            for (let i = 0; i < this.layoutCargado.length; i++) {
              if (this.layoutCargado[i].indexOf(this.periodo) != -1) {
                this.layoutCargado[i] = this.layoutCargado[i].replace(this.periodo, "MES 0 AL 9");
              }

            }
            this.periodo = "MES 0 AL 9";
          }
       }
       else{
          this.referenciaError = this.dialogo.open(PopErrorComponent, {
            width: "60%",
            data: {
              nombre: files.name
            }
          });
        }
      });
      });
    }
    catch (err) {
      console.log(err);
      alert("Error al cargar el archivo");
    }
    fileInput.value = "";
  }

  public eliminaElemento() {
    var etiqueta = document.getElementById('columna');
    etiqueta.innerHTML = '<input type="file" accept=".txt, .csv" name="file" id="file" class="inputfile">\n' +
      '      <label for="file" id="etiqueta"><span class="glyphicon glyphicon-open" aria-hidden="true" id="elimina"></span></label>';
    document.getElementById('file').addEventListener('change', this.fileChangeEvent.bind(this));
    document.getElementById('file').style.overflow = "hidden";
    document.getElementById('file').style.width = '0px';
    document.getElementById('file').style.height = '0px';
    document.getElementById('elimina').style.cursor = "pointer";
    document.getElementById('elimina').style.fontSize = "18px";
    document.getElementById('elimina').style.marginTop = "5px"
    this.gastos.archivo = "";
    this.verificarEstadoElementos();
  }

  accionEnviar() {
    this.loading=true;
    (<HTMLInputElement> document.getElementById("botonEnviar")).disabled = true;
    document.body.style.cursor = "wait";
    var etiqueta = document.getElementById('columna');
    etiqueta.innerHTML = '<div class="row"><div class="col-md-8">' + this.gastos.archivo.name + '</div><div class="col-md-4"><P ALIGN="RIGHT"><span class="glyphicon glyphicon-trash" id="agrega" aria-hidden="true"></span></P> </div></div>';
    document.getElementById('agrega').style.fontSize = "16px";
    //document.getElementById('agrega').removeEventListener('click', this.eliminaElemento.bind(this));
      /*.onclick = function () {
      return false;
    };
*/

    this.gastoServicio.enviarInforme(this.gastos).subscribe((respuesta) => {
      console.log(respuesta);
      if (respuesta) {
       // console.log(respuesta.toString());
       var accion=respuesta['success'];
       var archivo=accion.replace("se inserto el archivo ","")
      //   .toString.replace("se inserto el archivo ","")
       //alert(archivo);
    //    let archivo=JSON.parse(respuesta.toString()).success;
      //  alert(archivo);
     //   let archivo=JSON.parse(respuesta.toString());
      //  alert(archivo);
      //  let objeto={"correo":JSON.parse(sessionStorage.getItem('usuarioActual')).correo,"archivo":archivo};
       // let insertar=JSON.stringify(objeto);
//console.log(insertar);
        let formData:FormData = new FormData();
        formData.append("correo",JSON.parse(sessionStorage.getItem('usuarioActual')).correo);
        formData.append("archivo",archivo);
        this.gastoServicio.agregarDatos(formData).subscribe(folio=>{
          console.log(folio);
          let infoFolio="";
          if(folio!="Error"){
            infoFolio=JSON.parse(folio.toString()).folio;
            /*
            this.user.nombre=JSON.parse(datos.toString()).nombre;
            sessionStorage.setItem('usuarioActual', JSON.stringify(this.user));
            document.getElementById("sesion").innerHTML=this.user.nombre;*/
          }
          document.body.style.cursor = "auto";
          this.loading=false;
          this.referenciaInforme = this.dialogo.open(PopInformeComponent, {width: "60%",
            data: {
              folio: "Folio: " + infoFolio
            }});
          this.referenciaInforme.afterClosed().subscribe(result => {
           // (<HTMLInputElement> document.getElementById("agrega")).disabled = false;
            (<HTMLInputElement> document.getElementById("botonEnviar")).disabled = false;
            this.limpiarpantalla();
        });
        });
      }
    }, err => {
      console.log(err);
      alert("Error");
      document.body.style.cursor = "auto";
      this.loading=false;
      this.limpiarpantalla();
    });



  }

  public cambiaColor(entrada: any, nombre: string) {
    document.getElementById(nombre).style.borderColor = '#ff570a';
    document.getElementById(nombre).style.backgroundImage = "url('../../assets/img/flechaCombosCopy.png')";
    if (nombre == "formulario") {
      if (this.gastos.archivo != "") {
        this.gastos.archivo = "";
        this.eliminaElemento();
      }
      else {
        document.getElementById("etiqueta").onclick = function () {
          return true;
        };
      }

      if (this.gastos.tipoArchivo === "servicios_auxiliares") {
        this.serviciosAux.getServAux().subscribe(datos => {
          this.layoutCargado = datos;
          console.log(datos)
        });
      }
      else if (this.gastos.tipoArchivo === "medicamentos") {
        this.serviciosAux.getCPM().subscribe(datos => {
          this.layoutCargado = datos;
          console.log(datos)
        });
      }
      else if(this.gastos.tipoArchivo === "insumos_medicos"){
        this.serviciosAux.getATC().subscribe(datos => {
          this.layoutCargado = datos;
          console.log(datos);
        });
      }
    }
    this.verificarEstadoElementos();
  }

  verificarEstadoElementos() {
    if (this.gastos.archivo != "" && this.gastos.lineaNegocio != "" && this.gastos.tipoArchivo != "" && this.gastos.anio != "" && this.gastos.mes != "") {
      (<HTMLInputElement> document.getElementById("botonEnviar")).disabled = false;
    }
    else {
      (<HTMLInputElement> document.getElementById("botonEnviar")).disabled = true;
    }
  }


  limpiarpantalla() {
    var nuevaFecha = new Date();
    this.gastos.tipoArchivo = "";
    this.gastos.lineaNegocio = "";
    this.gastos.archivo = "";
    this.gastos.mes=this.mesDia[nuevaFecha.getMonth()]
    this.gastos.anio=nuevaFecha.getFullYear().toString();
    this.eliminaElemento();
    document.getElementById("etiqueta").onclick = function () {
      return false;
    }
    var elementosSelect = document.getElementsByTagName("select");
    for (var i = 0; i < elementosSelect.length; i++) {
      elementosSelect[i].style.borderColor = '#c0c9cf';
      elementosSelect[i].style.backgroundImage = 'url("../../assets/img/flechaCombos.png")';
    }
  }

  leerArchivo(file: any) {
    var reader = new FileReader();
    //Solo funciona en html 5
    return new Promise(function (resolve, reject) {
      reader.onload = (function (theFile) {
        return function (e) {
          resolve(reader.result);
        };
      })(file);
      try {
        reader.readAsText(file, "ISO-8859-1");
      }
      catch (error) {
      }
    });
  }

  leerArchivoUTF8(file: any) {
    var reader = new FileReader();
    //Solo funciona en html 5
    return new Promise(function (resolve, reject) {
      reader.onload = (function (theFile) {
        return function (e) {
          resolve(reader.result);
        };
      })(file);
      try {
        reader.readAsText(file);
      }
      catch (error) {
      }
    });
  }

  analizarContenido(listaEncabezados: any, encUTF8:any): boolean {
    if (listaEncabezados.length > (this.layoutCargado.length+10)  || listaEncabezados.length < this.layoutCargado.length)    {
      return false;
    }
    else {
      this.validarEncabezadosCambiantes(listaEncabezados);
        return this.validarOrden(listaEncabezados,encUTF8);
    }
  }

  validarEncabezadosCambiantes(arreglo:any){
    let palabra: string;
    for(let i=0;i<this.layoutCargado.length;i++){
      palabra=this.layoutCargado[i].toString();
      if(palabra.indexOf("MES 0 AL 9")!=-1){
         palabra=palabra.replace("MES 0 AL 9", "");
          for(let j=0;j<arreglo.length;j++){
            if(arreglo[j].indexOf(palabra)!=-1){
              if(this.periodo=="MES 0 AL 9"){
                  if(this.mesEnc.includes(arreglo[j].substring(palabra.length,palabra.length+3))){
                    this.periodo=arreglo[j].substring(palabra.length,arreglo[j].length);
                    this.layoutCargado[i]=arreglo[j];
                  }
              }
              else{
                if(arreglo[j]==(palabra+this.periodo)){
                  this.layoutCargado[i]=arreglo[j];
                }
              }
            }
          }
      }
    }
  }

  validarOrden(listaEncabezados:any, encUTF8):boolean{
      for(let i=0;i<this.layoutCargado.length;i++){
          if(listaEncabezados[i]!=this.layoutCargado[i]){
            if(encUTF8[i]!=this.layoutCargado[i]){
              return false;
            }


          }
      }
      return true;
  }

}

export class GastosMedicos{
  public lineaNegocio:string;
  public tipoArchivo:string;
  public anio:string;
  public mes:string;
  public archivo:any;

  constructor(){
    this.archivo="";
    this.lineaNegocio="";
    this.tipoArchivo="";
    this.anio="";
    this.mes="";
  }
}

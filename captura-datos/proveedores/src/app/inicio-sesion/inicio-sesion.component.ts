import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from "./usuario";
import {UsuariosService} from "../servicios/usuarios.service";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
 // users: User[] = [];
  user: User;
  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  login(){
    //let respuesta:any;
    this.userService.getUsers(this.user.correo,this.user.password)
      .subscribe((datos) => {
        if(sessionStorage.getItem('usuarioActual')){
          sessionStorage.removeItem('usuarioActual');
        }
        if(datos!="Error"){
          this.user.nombre=JSON.parse(datos.toString()).nombre;
          this.user.ATC=Number(JSON.parse(datos.toString()).ATC);
          this.user.CPM=Number(JSON.parse(datos.toString()).CPM);
          this.user.SA=Number(JSON.parse(datos.toString()).SA);
          sessionStorage.setItem('usuarioActual', JSON.stringify(this.user));
          document.getElementById("sesion").innerHTML=this.user.nombre;
        }
        this.router.navigate(['captura-datos']);
      });
  }

  redireccionaPagina(){
    this.router.navigate(['recuperar-pass']);
  }

}

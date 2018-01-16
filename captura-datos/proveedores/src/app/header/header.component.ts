import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../inicio-sesion/usuario";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
//document.getElementById("sesion").textContent
    if(sessionStorage.getItem('usuarioActual')){
      document.getElementById("sesion").innerHTML=JSON.parse(sessionStorage.getItem('usuarioActual')).nombre;
    }
  }
  finalizar(){
    document.getElementById("imgS").hidden=true;
    document.getElementById("sesion").hidden=true;
    document.getElementById("linea").hidden=true;
    sessionStorage.removeItem('usuarioActual');
    this.router.navigate(['']);
  }

}

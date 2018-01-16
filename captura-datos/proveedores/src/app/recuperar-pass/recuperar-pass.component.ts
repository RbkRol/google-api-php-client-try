import { Component, OnInit} from '@angular/core';
import {UsuariosService} from "../servicios/usuarios.service";
import {User} from "../inicio-sesion/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {
  user: User;

  constructor(private userService: UsuariosService, private router:Router) { }

  ngOnInit() {
    this.user = new User();
  }

  enviarCorreo(){
    this.userService.getPass(this.user.correo)
      .subscribe(data=>{
        if(data==="Ok") {
          alert("Se ha enviado un correo con su password");
          this.router.navigate(['']);
        }
        else{
          alert(data);
        }
      });
  }
}

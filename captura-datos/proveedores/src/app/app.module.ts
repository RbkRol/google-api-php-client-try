import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { CapturaDatosComponent } from './captura-datos/captura-datos.component';
import {HttpClientModule} from '@angular/common/http';
import {GastosMedicosService} from "./servicios/gastos-medicos.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
import {routing} from './app.routing';
import { PopArchivoComponent } from './captura-datos/pops/pop-archivo/pop-archivo.component';
import { PopInformeComponent } from './captura-datos/pops/pop-informe/pop-informe.component';
import {MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationGuardService} from "./servicios/authentication-guard.service";
import {UsuariosService} from "./servicios/usuarios.service";
import {LayoutService} from "./servicios/layout.service";
import { PopErrorComponent } from './captura-datos/pops/pop-error/pop-error.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CapturaDatosComponent,
    RecuperarPassComponent,
    HeaderComponent,
    FooterComponent,
    PopArchivoComponent,
    PopInformeComponent,
    PopErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents:[PopArchivoComponent, PopInformeComponent, PopErrorComponent],
  providers: [GastosMedicosService, AuthenticationGuardService, UsuariosService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }

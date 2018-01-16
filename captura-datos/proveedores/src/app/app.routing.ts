import { RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CapturaDatosComponent} from "./captura-datos/captura-datos.component";
import {InicioSesionComponent} from "./inicio-sesion/inicio-sesion.component";
import {RecuperarPassComponent} from "./recuperar-pass/recuperar-pass.component";
import {AuthenticationGuardService} from "./servicios/authentication-guard.service";

const appRoutes: Routes = [
  { path: '', component: InicioSesionComponent},
    { path: 'captura-datos', component: CapturaDatosComponent, canActivate: [AuthenticationGuardService]},
    { path: 'recuperar-pass', component: RecuperarPassComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

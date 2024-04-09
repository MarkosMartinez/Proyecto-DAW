import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isManager(): boolean {
    if(this.authService.getRol() == "manager") return true;
    return false;
  }

  cerrarSesion(){
    this.authService.cerrarSesion().subscribe(resultado =>{
      if(resultado){
        this.cookieService.delete('token');
        this.cookieService.delete('name');
        this.cookieService.delete('rol');
        this.router.navigate(['login']);
      }else{
        //TODO Mostrar aviso de que se va a cerrar mal la sesion?
        this.cookieService.delete('token');
        this.cookieService.delete('name');
        this.cookieService.delete('rol');
        this.router.navigate(['login']);
      }
    });
  }

  pin(){
    console.log("BtnPin pulsado");
  }

}

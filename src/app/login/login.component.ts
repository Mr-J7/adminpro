import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor( public usuarioService: UsuarioService,
               public router: Router ) { }

  ngOnInit(): void {
    this.googleInit();
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0 ){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '256093776846-h07okh9j1krirkgjgi0j22qkcsvcu3ad.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ){
    
    this.auth2.attachClickHandler( element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token)
        .subscribe( resp => window.location.href = 'dashboard' );
    });
  }



  ingresar(forma: NgForm ){

    if( forma.invalid){
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    )

    this.usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}

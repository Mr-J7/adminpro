import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: any;

  constructor( public usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ){
    this.usuario.nombre = usuario.nombre;

    if( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actulizarUsuario( this.usuario )
      .subscribe();
  }

  seleccionImagen( archivo: File ){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if( archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imagenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }


  cambiarImagen(){

    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id );

  }

}

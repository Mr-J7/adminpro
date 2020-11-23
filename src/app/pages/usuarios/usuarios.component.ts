import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor( public usuarioService: UsuarioService,
               public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ){
    this.modalUploadService.mostrarModal('usuarios', id)
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
      
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      })

  }


  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros ){
      return;
    }

    if ( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios()
  }




  buscarUsuario( termino: string ){

    if ( termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuarios(termino)
      .subscribe( (resp: any) => {
        this.usuarios = resp;
        this.cargando = false;
      });

  }


  borrarUsuario( usuario: Usuario ){
    if ( usuario._id === this.usuarioService.usuario._id){
      Swal.fire({
        title: 'No puede borrar usuario!',
        text: 'No se puede borrar a si mismo',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }


    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas a punto de borrar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        
        if ( result.isConfirmed){
          this.usuarioService.borrarUsuario(usuario._id)
            .subscribe( resp => {
              console.log(resp);
              this.cargarUsuarios();
            });
            
        }

        Swal.fire(
          'Borrado!',
          'Se elimino ' + usuario.nombre,
          'success'
        )
      }
    });


  }


  guardarUsuario( usuario: Usuario ){

    this.usuarioService.actulizarUsuario( usuario )
      .subscribe();

  }

}

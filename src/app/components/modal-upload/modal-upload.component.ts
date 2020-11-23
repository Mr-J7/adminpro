import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {


  
  imagenSubir: File;

  imagenTemp: any;

  constructor( private subirArchivoService: SubirArchivoService, 
               public  modalUploadServices: ModalUploadService) {

    console.log('modal listo');

   }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUploadServices.ocultarModal();
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


  subirImagen(){
    
    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadServices.tipo, this.modalUploadServices.id )
    .then( resp =>{
      this.modalUploadServices.notificacion.emit( resp );
      this.cerrarModal();

    })
    .catch( resp =>{
      console.log('Error en la carga...');
    });
  }

}

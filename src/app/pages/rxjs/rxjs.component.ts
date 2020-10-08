import { Component, OnInit, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { }

  //   let obs = new Observable( resp => {
      
  //     let contador = 0;
  //     let intervalo = setInterval( () => {
  //       contador += 1;
  //       resp.next( contador );
        
  //       if( contador === 3 ){
  //         clearInterval( intervalo );
  //         resp.complete();
  //       }

  //       if( contador === 2 ){
  //         clearInterval( intervalo );
  //         resp.error('Auxilio!!!')
  //       }



  //     }, 1000);
  //   });



  //   obs
  //   .subscribe(
  //     resp => console.log('resp', resp),
  //     error => console.log('error', error),
  //     () => console.log('termino')
  //     );
  // }

  ngOnInit(): void {}

}

import { Component, OnInit } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor( private router: Router,
               public title: Title,
               public meta: Meta  ) { 

   this.getDataRoute()
    .subscribe( evento => {

      this.label = evento.titulo;
      console.log(evento);
      this.title.setTitle( this.label );

      let metaTag: MetaDefinition = {
        name: 'Descripton',
        content: this.label,
      }

      this.meta.updateTag( metaTag )
    })
  }

  ngOnInit(): void {
  }


  getDataRoute(){
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild  === null),
      map( (evento: ActivationEnd ) => evento.snapshot.data )
    );
  }

}

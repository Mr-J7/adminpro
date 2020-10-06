import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

  @Input() labels: Label[];
  @Input() data: MultiDataSet;
  @Input() type: ChartType;
  @Input() leyenda;


  constructor() {
  }

  ngOnInit(): void { }

}

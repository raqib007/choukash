import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'elastic-state-widget',
  templateUrl: './state-widget.component.html',
  styleUrls: ['./state-widget.component.scss']
})
export class StateWidgetComponent implements OnInit {

  @Input() backgroundColor = '#FFF';
  @Input() textColor = '#111';
  @Input() value: number;
  @Input() valuePrefix = '';
  @Input() property: string;
  @Input() icon: string;
  @Input() changePercent: number;
  @Input() changeIcon: string;

  constructor() { }

  ngOnInit() {
  }

}

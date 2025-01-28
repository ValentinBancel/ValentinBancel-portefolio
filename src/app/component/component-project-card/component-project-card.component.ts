import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-component-project-card',
    imports: [NgFor],
    templateUrl: './component-project-card.component.html'
})
export class ComponentProjectCardComponent {
  @Input() project: any= []
  
  /*
  Info needed:
  Title
  short description
  image
  link
  tags
  */
}

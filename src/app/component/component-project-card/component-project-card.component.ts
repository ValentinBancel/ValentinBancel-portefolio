import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-component-project-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './component-project-card.component.html',
  styleUrl: './component-project-card.component.scss'
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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-project-card',
  templateUrl: './component-project-card.component.html',
  styleUrl: './component-project-card.component.scss'
})
export class ComponentProjectCardComponent {
  // @Input() projectsListe: any;
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
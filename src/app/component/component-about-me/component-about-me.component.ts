import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-about-me',
  templateUrl: './component-about-me.component.html',
  styleUrl: './component-about-me.component.scss'
})
export class ComponentAboutMeComponent {
  @Input() history: any = [[]] ;
}
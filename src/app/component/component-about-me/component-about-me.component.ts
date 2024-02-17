import { Component, Input, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-component-about-me',
  templateUrl: './component-about-me.component.html',
  styleUrl: './component-about-me.component.scss'
})
export class ComponentAboutMeComponent implements OnInit{
  @Input() history: any = [[]] ;
  public finalHistory: any = [] ;
  ngOnInit(): void {
    console.log(this.history[0][0]);
  }
}
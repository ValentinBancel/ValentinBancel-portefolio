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
    if (this.history.length < 2){
      this.finalHistory = this.history
    } else {
      for (let i = 0; i < this.history.length; i++){
        if (i % 2 === 0){
          this.finalHistory.push(this.history[i])
        } else {
          this.finalHistory.push(this.history[i].reverse())
        }
      }
    }
    console.log(this.history)
    console.log(this.finalHistory)
  }

  // public checkOrderElememt(elementList: []): boolean {
  //   if (elementList[0].start)
  // }
}
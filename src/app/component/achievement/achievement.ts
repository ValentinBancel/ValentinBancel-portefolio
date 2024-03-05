import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.html',
  styleUrl: './achievement.scss'
})
export class AchievementDisplay {
  @Input() achievement: any;
}
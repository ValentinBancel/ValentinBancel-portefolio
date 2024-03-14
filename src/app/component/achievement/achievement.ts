import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [],
  templateUrl: './achievement.html',
  styleUrl: './achievement.scss'
})
export class AchievementDisplay {
  @Input() achievement: any;
}
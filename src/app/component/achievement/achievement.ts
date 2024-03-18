import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [],
  templateUrl: './achievement.html',
  styleUrl: './achievement.scss'
})
export class AchievementComponent {
  @Input() achievement: any;
}

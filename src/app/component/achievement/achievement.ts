import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.html',
})
export class AchievementDisplay {
  @Input() achievement: any;
}
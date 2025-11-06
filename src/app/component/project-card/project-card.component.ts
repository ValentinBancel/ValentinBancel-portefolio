import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Project } from '../../models';

@Component({
    selector: 'app-project-card',
    imports: [NgFor],
    templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  @Input() project!: Project;
}

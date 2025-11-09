import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ProjectCardComponent } from '../component/project-card/project-card.component';
import { Project } from '../models';
import { MetaTagService } from '../services/meta-tag.service';
import { ProjectService } from '../services/project.service';

@Component({
    selector: 'app-project',
    imports: [HeaderComponent, FooterComponent, ProjectCardComponent, NgFor],
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  public ProjectList: Project[] = [];

  constructor(
    private metaTagService: MetaTagService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.metaTagService.setPageMetaTags({
      description: 'This is a list of my projects',
      title: 'Portfolio Project Page',
      author: 'Valentin Bancel',
      keywords: 'Portfolio, Développeur web, Développeur informatique, Développeur full stack, Projects, C++, Python3, Van der whaal, Physics, PDF, Tools'
    });

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.ProjectList = projects;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }
}

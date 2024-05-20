import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ComponentProjectCardComponent } from '../component/component-project-card/component-project-card.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ComponentProjectCardComponent, NgFor],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  constructor(private meta: Meta) {
    this.meta.addTags([
      { name: 'description', content: 'This is a list of my projects' },
      { name: 'author', content: 'Valentin Bancel' },
      // { name: 'keywords', content: 'Valentin Bancel, Projects, C++, Python3, Van der whaal, Physics, PDF, Tools' },
    ]);
  }
  public ProjectList: any =   [
    {
      title: 'Force de Van Der Whaal',
      description: 'En C++, j\'ai réalisé un programme qui permet de calculer la force de Van Der Whaal entre deux molécules.',
      image: 'assets/logo_force_de_van_der_whaal.webp',
      link: 'https://github.com/ValentinBancel/Force_de_van_der_Waals',
      tags: ["c++",'Physics', 'Van der whaal'],
    },
    // {
    //   title: 'DataLink',
    //   description: 'DataLink est un ORM custom pour multiple database. (Il est en cours de developpement)',
    //   image: 'assets/Datalink_project.webp',
    //   link: 'https://github.com/ValentinBancel/DataLink',
    //   tags: ['Python3', 'ORM', 'Database'],
    // },
    {
      title: 'PDF-Tools',
      description: "Ceci est un outil permettant de fusionner plusieurs fichier pdf en un seul ou d'extraires chaques pages d'un pdf en python.",
      image: 'assets/pdf_logo.webp',
      link: 'https://github.com/ValentinBancel/pdf_gen.git',
      tags: ['Python3', 'PDF', 'Tools'],
    }
    ]
}

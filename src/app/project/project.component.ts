import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ComponentProjectCardComponent } from '../component/component-project-card/component-project-card.component';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-project',
    imports: [HeaderComponent, FooterComponent, ComponentProjectCardComponent, NgFor],
    templateUrl: './project.component.html'
})
export class ProjectComponent {
  constructor(private meta: Meta) {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="title"');
    this.meta.removeTag('name="keywords"');
    this.meta.addTags([
      { name: 'description', content: 'This is a list of my projects' },
      { name: 'title', content: 'Portfolio Project Page' },
      { name: 'author', content: 'Valentin Bancel' },
      {name:'keywords', content:'Portfolio, Développeur web, Développeur informatique, Développeur full stack, Projects, C++, Python3, Van der whaal, Physics, PDF, Tools'}
    ]);
  }
  public ProjectList: any =   [
    {
      title: 'Force de Van Der Waals',
      description: 'En C++, j\'ai réalisé un programme qui permet de calculer la force de Van Der Waals entre deux molécules.',
      image: 'assets/logo_force_de_van_der_whaal.webp',
      link: 'https://github.com/ValentinBancel/Force_de_van_der_Waals',
      tags: ["c++",'Physics', 'Van der waals'],
    },
    {
      title: 'PDF-Tools',
      description: "Ceci est un outil permettant de fusionner plusieurs fichier pdf en un seul ou d'extraires chaques pages d'un pdf en python.",
      image: 'assets/pdf_logo.webp',
      link: 'https://github.com/ValentinBancel/pdf_gen.git',
      tags: ['Python3', 'PDF', 'Tools'],
    },
    {
      title: 'Isi-App',
      description: "Isi-app est une solution complète pour piloter et sécuriser votre système d'information.",
      image: 'https://isi-app.com/wp-content/uploads/2025/03/logo.svg',
      link: 'https://isi-app.com/',
      tags: ['Api', 'Médico social', 'SI', 'Fullstack', 'IA', 'BI'],
    }
    ]
}

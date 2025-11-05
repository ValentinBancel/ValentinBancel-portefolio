import { Injectable } from '@angular/core';
import { Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      title: 'Force de Van Der Waals',
      description: 'En C++, j\'ai réalisé un programme qui permet de calculer la force de Van Der Waals entre deux molécules.',
      image: 'assets/logo_force_de_van_der_whaal.webp',
      link: 'https://github.com/ValentinBancel/Force_de_van_der_Waals',
      tags: ['c++', 'Physics', 'Van der waals'],
    },
    {
      title: 'PDF-Tools',
      description: 'Ceci est un outil permettant de fusionner plusieurs fichier pdf en un seul ou d\'extraires chaques pages d\'un pdf en python.',
      image: 'assets/pdf_logo.webp',
      link: 'https://github.com/ValentinBancel/pdf_gen.git',
      tags: ['Python3', 'PDF', 'Tools'],
    },
    {
      title: 'Isi-App',
      description: 'Isi-app est une solution complète pour piloter et sécuriser votre système d\'information.',
      image: 'https://isi-app.com/wp-content/uploads/2025/03/logo.svg',
      link: 'https://isi-app.com/',
      tags: ['Api', 'Médico social', 'SI', 'Fullstack', 'IA', 'BI'],
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectByTitle(title: string): Project | undefined {
    return this.projects.find(project => project.title === title);
  }
}

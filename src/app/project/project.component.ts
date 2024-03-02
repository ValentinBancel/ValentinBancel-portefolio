import { Component } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ComponentProjectCardComponent } from '../component/component-project-card/component-project-card.component';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
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
  //   tags: ['Python3', 'ORM', 'Database', "Neo4j", "PostgreSQL", "MySQL", "SQLite"],
  // }
  ]
}

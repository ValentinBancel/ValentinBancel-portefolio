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
  public ProjectList: any = [
    {
      title: 'DataLink',
      description: 'DataLink is an custom ORM for multiple database. (Is not finished yet)',
      image: '../../../assets/Datalink_project.png',
      link: 'https://github.com/ValentinBancel/DataLink',
      tags: ['Python3', 'ORM', 'Database', "Neo4j", "PostgreSQL", "MySQL", "SQLite"],
    },
    {
      title: 'Force de Van Der Whaal',
      description: 'I created a c++ code for calculate the force of Van Der Whaal between two molecules.',
      image: '../../../assets/logo_force_de_van_der_whaal.png',
      link: 'https://github.com/ValentinBancel/Force_de_van_der_Waals',
      tags: ["c++",'Physics', 'Van der whaal'],
    }
  ]
}

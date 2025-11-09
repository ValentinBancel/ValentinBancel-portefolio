import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectComponent } from './project/project.component';
import { CvPageComponent } from './cv-page/cv-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';



export const routes: Routes = [
  {
      path: '',
      component: HomePageComponent,
  },
  {
      path: 'project',
      component: ProjectComponent,
  },
  {
      path: 'cv',
      component: CvPageComponent,
  },
  {
      path: 'services',
      component: ServicesPageComponent,
  }
];

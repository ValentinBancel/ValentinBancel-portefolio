import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ArchievementComponent } from './archievement/archievement.component';
import { ProjectComponent } from './project/project.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'achievement',
        component: ArchievementComponent,
    },
    {
        path: 'project',
        component: ProjectComponent,
    }
];

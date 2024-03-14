import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
// import { AchievementComponent } from './achievement/achievement.component';
// import { ProjectComponent} from './project/project.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    // {
    //     path: 'achievement',
    //     component: AchievementComponent
    // },
    // {
    //     path: 'project',
    //     component: ProjectComponent
    // },
];

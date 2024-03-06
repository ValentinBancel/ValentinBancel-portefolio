import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectComponent } from './project/project.component';
import { AchievementComponent } from './achievement/achievement.component';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: 'achievement',
		component: AchievementComponent
	},
	{
		path: 'project',
		component: ProjectComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: 'about-me',
		component: AboutMeComponent
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

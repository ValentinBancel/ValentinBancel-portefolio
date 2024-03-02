import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CompetencesComponent } from './competences/competences.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: 'competences',
		component: CompetencesComponent
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

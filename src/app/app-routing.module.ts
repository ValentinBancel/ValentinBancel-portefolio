import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomePageComponent
	},
	{
		path: 'about-me',
		component: AboutMeComponent
	},
	{
		path: 'project',
		component: HomePageComponent
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

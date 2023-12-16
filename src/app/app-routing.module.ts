import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
	{
		path: 'header',
		component: HeaderComponent
	},
	{
		path: 'home',
		component: HomePageComponent
	},
	{
		path: 'about-me',
		component: HomePageComponent
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

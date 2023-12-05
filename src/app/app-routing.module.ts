import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	// { path: '', redirectTo: '/home', pathMatch: 'full' },
	// { path: 'home', component: HomeComponent },
	// { path: 'about', component: AboutComponent },
	// { path: 'project', component: ProjectComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

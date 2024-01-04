import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectComponent } from './project/project.component';
import { ComponentAboutMeComponent } from './component/component-about-me/component-about-me.component';
import { ComponentProjectCardComponent } from './component/component-project-card/component-project-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomePageComponent,
		AboutMeComponent,
		ProjectComponent,
		ComponentAboutMeComponent,
		ComponentProjectCardComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: !isDevMode(),
    // Register the ServiceWorker as soon as the application is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  }),
	],
	providers: [],
	bootstrap: [
		AppComponent,
	]
})
export class AppModule { }

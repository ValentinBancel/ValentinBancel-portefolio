import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectComponent } from './project/project.component';
import { ComponentProjectCardComponent } from './component/component-project-card/component-project-card.component';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementDisplay } from './component/achievement/achievement';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomePageComponent,
		ProjectComponent,
		AchievementDisplay,
		AchievementComponent,
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
	providers: [
    provideClientHydration()
  ],
	bootstrap: [
		AppComponent,
	]
})
export class AppModule { }

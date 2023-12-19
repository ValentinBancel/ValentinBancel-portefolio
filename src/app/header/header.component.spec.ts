import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderComponent]
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	  it('should return the current route', () => {
		const router = { url: '/home' } as Router;
		component = new HeaderComponent(router);
		expect(component.isCurrentRoute()).toBe('/home');
	  });
	
	  it('should set home_classe to active when route is /home', () => {
		const router = { url: '/home' } as Router;
		component = new HeaderComponent(router);
		expect(component.home_classe).toBe('active disabled-click text-white');
		expect(component.about_me_classe).toBe('button-text');
		expect(component.project_classe).toBe('button-text');
	  });
	
	  it('should set about_me_classe to active when route is /about-me', () => {
		const router = { url: '/about-me' } as Router;
		component = new HeaderComponent(router);
		expect(component.home_classe).toBe('button-text');
		expect(component.about_me_classe).toBe('active disabled-click text-white');
		expect(component.project_classe).toBe('button-text');
	  });
	
	  it('should set project_classe to active when route is /project', () => {
		const router = { url: '/project' } as Router;
		component = new HeaderComponent(router);
		expect(component.home_classe).toBe('button-text');
		expect(component.about_me_classe).toBe('button-text');
		expect(component.project_classe).toBe('active disabled-click text-white');
	  });
});
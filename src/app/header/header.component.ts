import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	home_classe: string = 'button-text col-start-10';
	about_me_classe: string = 'button-text col-start-11';
	project_classe: string = 'button-text col-start-12';
	actual_route: string = '';

	constructor(private router: Router) {
		this.actual_route = this.isCurrentRoute();

		switch (this.actual_route) {
			case '/home':
				this.home_classe = 'active disabled-click text-white';
				this.about_me_classe = 'button-text';
				this.project_classe = 'button-text';
				break;
			case '/about-me':
				this.home_classe = 'button-text';
				this.about_me_classe = 'active disabled-click text-white';
				this.project_classe = 'button-text';
				break;
			case '/project':
				this.home_classe = 'button-text';
				this.about_me_classe = 'button-text';
				this.project_classe = 'active disabled-click text-white';
				break;
		}
	}

	isCurrentRoute(): string {
		return this.router.url
	}
}

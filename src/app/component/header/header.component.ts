import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	home_classe: string = '';
	about_me_classe: string = '';
	project_classe: string = '';
	actual_route: string = '';

	constructor(private router: Router) {
		this.actual_route = this.isCurrentRoute();

		switch (this.actual_route) {
			case '/home':
				this.home_classe = 'active disabled-click text-white mr-[1%] ml-[1%] pt-[1%]';
				this.about_me_classe = 'button-text mr-[1%] ml-[1%] pt-[1%]';
				this.project_classe = 'button-text mr-[1%] ml-[1%] pt-[1%]';
				break;
			case '/about-me':
				this.home_classe = 'button-text mr-[1%] ml-[1%] pt-[1%]';
				this.about_me_classe = 'active disabled-click text-white mr-[1%] ml-[1%] pt-[1%]';
				this.project_classe = 'button-text mr-[1%] ml-[1%] pt-[1%]';
				break;
			case '/project':
				this.home_classe = 'button-text mr-[1%] ml-[1%] pt-[1%]';
				this.about_me_classe = 'button-text mr-[1%] ml-[1%] pt-[1%]';
				this.project_classe = 'active disabled-click text-white mr-[1%] ml-[1%] pt-[1%]';
				break;
		}
	}

	isCurrentRoute(): string {
		return this.router.url
	}
}
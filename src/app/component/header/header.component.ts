import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
	actual_route: string = '';

	constructor(private router: Router) {
		this.actual_route = this.isCurrentRoute();
	}

	isCurrentRoute(): string {
		return this.router.url
	}
}
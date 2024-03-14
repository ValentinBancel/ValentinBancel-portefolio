import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
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
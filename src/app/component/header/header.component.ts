import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
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


/*
'/' ? 'button-text disabled-click active p-2 font-HelveticaNeue' : 'p-2 font-HelveticaNeue' "
'/achievement' ? 'button-text disabled-click active p-2 font-HelveticaNeue' : 'button-text p-2 font-HelveticaNeue' "
'/project' ? 'button-text disabled-click active p-2 ont-HelveticaNeue' : 'button-text p-2 font-HelveticaNeue' "



*/
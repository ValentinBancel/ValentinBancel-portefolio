import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  navItems: NavItem[] = [
    { label: 'Project', path: '/project' },
    { label: 'My Cv', path: '/cv' }
  ];

  constructor(private router: Router) {}

  get currentRoute(): string {
    return this.router.url;
  }
}
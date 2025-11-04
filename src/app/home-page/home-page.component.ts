import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  standalone: true,
})
export class HomePageComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    // Set page title
    this.titleService.setTitle('Portfolio - Valentin Bancel | Full Stack Developer');

    // Remove any existing meta tags
    const metaNames = ['description', 'keywords', 'author'];
    metaNames.forEach(name => this.meta.removeTag(`name="${name}"`));

    // Add updated meta tags
    this.meta.addTags([
      {
        name: 'description',
        content: 'Portfolio de Valentin Bancel, développeur full stack spécialisé en développement web et intelligence artificielle.'
      },
      {
        name: 'keywords',
        content: 'Portfolio, Développeur web, Développeur informatique, Développeur full stack, Intelligence Artificielle'
      },
      {
        name: 'author',
        content: 'Valentin Bancel'
      }
    ]);
  }
}

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
        content: 'Développeur full-stack et passionné de data, j\'explore depuis 2018 les liens entre le code, l\'intelligence artificielle et la prise de décision. Spécialisé en IA et data science à Lyon Ynov Campus.'
      },
      {
        name: 'keywords',
        content: 'Portfolio, Développeur full-stack, Data science, Intelligence Artificielle, IA, Lyon Ynov Campus, Epitech, Développeur web'
      },
      {
        name: 'author',
        content: 'Valentin Bancel'
      }
    ]);
  }
}

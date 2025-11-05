import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { MetaTagService } from '../services/meta-tag.service';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: true,
})
export class HomePageComponent implements OnInit {
  constructor(
    private metaTagService: MetaTagService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Portfolio - Valentin Bancel | Full Stack Developer');

    this.metaTagService.setPageMetaTags({
      description: 'Développeur full-stack et passionné de data, j\'explore depuis 2018 les liens entre le code, l\'intelligence artificielle et la prise de décision. Spécialisé en IA et data science à Lyon Ynov Campus.',
      keywords: 'Portfolio, Développeur full-stack, Data science, Intelligence Artificielle, IA, Lyon Ynov Campus, Epitech, Développeur web',
      author: 'Valentin Bancel'
    });
  }
}

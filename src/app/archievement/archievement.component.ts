import { Component } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { AchievementComponent } from '../component/achievement/achievement';
import { NgFor } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-archievement',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AchievementComponent, NgFor],
  templateUrl: './archievement.component.html',
})
export class ArchievementComponent {
  constructor(private meta: Meta) {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="title"');
    this.meta.removeTag('name="keywords"');
    this.meta.addTag({ name: 'description', content: 'Is the page where I show my achievements.' });
    this.meta.addTag({name:'title', content:'Portfolio Archievement Page'})
    this.meta.addTag({name:'keywords', content:'Portfolio, Développeur web, Développeur informatique, Développeur full stack, achievement, achievements'})
  }
  public achievementList: string[] = [
      'assets/diplome/Decouvrir_les_outils_du_referencement.webp',
      'assets/diplome/SEO_Comprendre_les_algorithmes_de_Google.webp'
  ]
}

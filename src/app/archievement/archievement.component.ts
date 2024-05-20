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
    this.meta.addTag({ name: 'description', content: 'Is the page where I show my achievements.' });
    this.meta.addTag({name:'title', content:'Portfolio Archievement Page'})
  }
  public achievementList: string[] = [
      'assets/diplome/Decouvrir_les_outils_du_referencement.webp',
      'assets/diplome/SEO_Comprendre_les_algorithmes_de_Google.webp'
  ]
}

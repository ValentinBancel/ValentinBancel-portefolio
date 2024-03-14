import { Component } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { AchievementComponent } from '../component/achievement/achievement';

interface Achievement {
  title: string;
  image: string;
}

@Component({
  selector: 'app-archievement',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AchievementComponent],
  templateUrl: './archievement.component.html',
  styleUrl: './archievement.component.scss'
})
export class ArchievementComponent {
  public achievementList: Achievement[] = [
    {
      title: '',
      image: 'assets/diplome/Decouvrir_les_outils_du_referencement.webp'
    },
    {
      title: '',
      image: 'assets/diplome/SEO_Comprendre_les_algorithmes_de_Google.webp'
    },
  ]
}

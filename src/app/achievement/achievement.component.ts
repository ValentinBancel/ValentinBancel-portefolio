import { Component } from '@angular/core';
import { FooterComponent } from '../component/footer/footer.component';
import { HeaderComponent } from '../component/header/header.component';
import { AchievementDisplay } from '../component/achievement/achievement';

interface Achievement {
  title: string;
  image: string;
}

@Component({
  selector: 'app-achievement-component',
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.scss'
})
export class AchievementComponent {
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

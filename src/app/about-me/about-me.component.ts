import { Component } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ComponentAboutMeComponent } from 'app/component/component-about-me/component-about-me.component';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
    histroy:any = [
        [
            "J'aime énormément apprendre et découvrir de nouvelles choses. C'est pourquoi j'aime beaucoup les défis. J'ai toujours été passionné par l'informatique et les nouvelles technologies. J'ai commencé à apprendre à programmer à l'âge de 16 ans. J'ai commencé par coder sur les calculatrices de lycée. J'ai ensuite appris le Python et l'html, css  pour pouvoir créer des sites web static. Je me suis très vite interressé au c++ au vu de la complexité de ce language. J'ai décider de rejoindre l'école Epitech a montpellier pour apprendre à programmer avec les bonne pratiques et les bonnes méthodes. Je reprends mes études en septembre 2024 pour obtenir une spécialitée en intelligence artificielle et deep learning.",
            "assets/info_picture.webp"
        ],
        // [
        //     'J\'ai participer a un stage de pilotage de Formule3. Une monoplace de 300ch pour 500kg. C\'est une voiture de course qui peut atteindre les 215km/h.',
        //     'assets/F3.webp'
        // ]
    ];
}
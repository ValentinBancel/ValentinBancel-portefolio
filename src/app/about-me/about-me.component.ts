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
    Texte: string = 'J\'ai participer a un stage de pilotage de Formule3. Une monoplace de 300ch pour 500kg. C\'est une voiture de course qui peut atteindre les 215km/h.';
    image: string = '../../assets/F3.jpg';
    Texte2: string = 'Je n\'ai pas peur de m\'amuser, de me deguiser et encore moins du ridicule.';
    image2: string = '../../assets/deguise.jpg';

    histroy:any = [[this.Texte, this.image], [this.Texte2, this.image2]]
}

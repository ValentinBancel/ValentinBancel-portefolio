import { Component } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Is starting page of my portfolio.' });
    this.meta.addTag({name:'title', content:'Portfolio home Page'})
    // this.meta.addTag({name:'keywords', content:'portfolio, home, page, starting page, home page, portfolio home page, portfolio starting page, developpeur, developpeur web, developpeur web junior, developpeur web junior freelance, developpeur web junior freelance front-end, developpeur web junior freelance front-end react, developpeur web junior freelance front-end reactjs, developpeur web junior freelance front-end react.js, developpeur web junior freelance front-end react js, developpeur web junior freelance front-end'})
  }

}

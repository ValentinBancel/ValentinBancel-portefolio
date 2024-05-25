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
    this.meta.addTag({ name: 'home_description', content: 'Is starting page of my portfolio.' });
    this.meta.addTag({name:'home_title', content:'Portfolio home Page'})
    this.meta.addTag({name:'home_keywords', content:'Portfolio, Développeur web, Développeur informatique, Développeur full stack'})
  }

}

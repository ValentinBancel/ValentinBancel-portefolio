import { Component } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'cv-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './cv-page.component.html',
})
export class CvPageComponent {

  constructor(private meta: Meta) {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="title"');
    this.meta.removeTag('name="keywords"');
    this.meta.addTag({ name: 'description', content: 'Is my CV page. You can download it.' });
    this.meta.addTag({name:'title', content:'CV Page'})
    this.meta.addTag({name:'keywords', content:'Portfolio, Développeur web, Développeur informatique, Développeur full stack, CV'})
  }

}

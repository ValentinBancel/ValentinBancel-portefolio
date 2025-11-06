import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { MetaTagService } from '../services/meta-tag.service';

@Component({
    selector: 'cv-page',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './cv-page.component.html'
})
export class CvPageComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {
    this.metaTagService.setPageMetaTags({
      description: 'Is my CV page. You can download it.',
      title: 'CV Page',
      keywords: 'Portfolio, Développeur web, Développeur informatique, Développeur full stack, CV'
    });
  }
}

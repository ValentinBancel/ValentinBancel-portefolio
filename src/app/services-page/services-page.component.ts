import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ServiceCardComponent } from '../component/service-card/service-card.component';
import { Service } from '../models';
import { MetaTagService } from '../services/meta-tag.service';
import { ServiceService } from '../services/service.service';

@Component({
    selector: 'app-services-page',
    imports: [HeaderComponent, FooterComponent, ServiceCardComponent, NgFor, NgIf],
    templateUrl: './services-page.component.html'
})
export class ServicesPageComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  public ServiceList: Service[] = [];
  public currentIndex = 0;

  constructor(
    private metaTagService: MetaTagService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.metaTagService.setPageMetaTags({
      description: 'Découvrez mes services de développement web et freelance',
      title: 'Services - Valentin Bancel',
      author: 'Valentin Bancel',
      keywords: 'Services, Développeur web, Freelance, Développeur full stack, Web development, Consulting'
    });

    this.serviceService.getActiveServices().subscribe({
      next: (services) => {
        this.ServiceList = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
      }
    });
  }

  scrollLeft(): void {
    if (this.carousel) {
      const container = this.carousel.nativeElement;
      const cardWidth = container.querySelector('.service-card')?.offsetWidth || 0;
      const gap = 32; // 2rem gap
      container.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }

  scrollRight(): void {
    if (this.carousel) {
      const container = this.carousel.nativeElement;
      const cardWidth = container.querySelector('.service-card')?.offsetWidth || 0;
      const gap = 32; // 2rem gap
      container.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
      });
    }
  }

  get canScrollLeft(): boolean {
    if (!this.carousel) return false;
    return this.carousel.nativeElement.scrollLeft > 0;
  }

  get canScrollRight(): boolean {
    if (!this.carousel) return false;
    const container = this.carousel.nativeElement;
    return container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
  }
}

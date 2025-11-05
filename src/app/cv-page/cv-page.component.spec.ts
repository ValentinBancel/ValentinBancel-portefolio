import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvPageComponent } from './cv-page.component';
import { MetaTagService } from '../services/meta-tag.service';
import { Meta } from '@angular/platform-browser';

describe('CvPageComponent', () => {
  let component: CvPageComponent;
  let fixture: ComponentFixture<CvPageComponent>;
  let metaTagServiceSpy: jasmine.SpyObj<MetaTagService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MetaTagService', ['setPageMetaTags']);

    await TestBed.configureTestingModule({
      imports: [CvPageComponent],
      providers: [
        { provide: MetaTagService, useValue: spy },
        Meta
      ]
    })
    .compileComponents();

    metaTagServiceSpy = TestBed.inject(MetaTagService) as jasmine.SpyObj<MetaTagService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set meta tags on init', () => {
    expect(metaTagServiceSpy.setPageMetaTags).toHaveBeenCalledWith({
      description: 'Is my CV page. You can download it.',
      title: 'CV Page',
      keywords: 'Portfolio, Développeur web, Développeur informatique, Développeur full stack, CV'
    });
  });
});

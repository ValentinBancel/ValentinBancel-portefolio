import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ArchievementComponent } from './archievement.component';
import { Meta } from '@angular/platform-browser';

describe('ArchievementComponent', () => {
  let component: ArchievementComponent;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ArchievementComponent ], // import the module here
      providers: [ Meta ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    meta = TestBed.inject(Meta);
    const fixture = TestBed.createComponent(ArchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the description meta tag', () => {
    const descriptionTag:any = meta.getTag('name="description"');
    expect(descriptionTag).toBeTruthy();
    expect(descriptionTag.content).toBe('Is the page where I show my achievements.');
  });

  it('should add the title meta tag', () => {
    const titleTag:any = meta.getTag('name="title"');
    expect(titleTag).toBeTruthy();
    expect(titleTag.content).toBe('Portfolio Archievement Page');
  });

  it('should add the keywords meta tag', () => {
    const keywordsTag:any = meta.getTag('name="keywords"');
    expect(keywordsTag).toBeTruthy();
    expect(keywordsTag.content).toBe('Portfolio, Développeur web, Développeur informatique, Développeur full stack, achievement, achievements');
  });

  it('should have correct achievementList', () => {
    expect(component.achievementList).toBeDefined();
    expect(component.achievementList).toEqual([
      'assets/diplome/Decouvrir_les_outils_du_referencement.webp',
      'assets/diplome/SEO_Comprendre_les_algorithmes_de_Google.webp'
    ]);
  });
});
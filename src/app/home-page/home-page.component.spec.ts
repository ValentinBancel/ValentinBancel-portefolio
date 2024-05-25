import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { Meta } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HomePageComponent ], // import the module here
      providers: [ Meta ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    meta = TestBed.inject(Meta);
    const fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the description meta tag', () => {
    const descriptionTag:any = meta.getTag('name="description"');
    expect(descriptionTag).toBeTruthy();
    expect(descriptionTag.content).toBe('Is starting page of my portfolio.');
  });

  it('should add the title meta tag', () => {
    const titleTag:any = meta.getTag('name="title"');
    expect(titleTag).toBeTruthy();
    expect(titleTag.content).toBe('Portfolio home Page');
  });

  it('should add the keywords meta tag', () => {
    const keywordsTag:any = meta.getTag('name="keywords"');
    expect(keywordsTag).toBeTruthy();
    expect(keywordsTag.content).toBe('Portfolio, Développeur web, Développeur informatique, Développeur full stack');
  });
});
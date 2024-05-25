import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component'; // import the module that contains ProjectComponent
import { Meta } from '@angular/platform-browser';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectComponent ], // import the module here
      providers: [ Meta ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    meta = TestBed.inject(Meta);
    const fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ProjectList defined', () => {
    expect(component.ProjectList).toBeDefined();
  });

  it('should have correct data in ProjectList', () => {
    expect(Array.isArray(component.ProjectList)).toBeTruthy();
  });

  it('should add the description meta tag', () => {
    const descriptionTag:any = meta.getTag('name="description"');
    expect(descriptionTag).toBeTruthy();
    expect(descriptionTag.content).toBe('This is a list of my projects');
  });

  it('should add the title meta tag', () => {
    const titleTag:any = meta.getTag('name="title"');
    expect(titleTag).toBeTruthy();
    expect(titleTag.content).toBe('Portfolio Project Page');
  });

  it('should add the author meta tag', () => {
    const titleTag:any = meta.getTag('name="author"');
    expect(titleTag).toBeTruthy();
    expect(titleTag.content).toBe('Valentin Bancel');
  });

  it('should add the keywords meta tag', () => {
    const keywordsTag:any = meta.getTag('name="keywords"');
    expect(keywordsTag).toBeTruthy();
    expect(keywordsTag.content).toBe('Portfolio, Développeur web, Développeur informatique, Développeur full stack, Projects, C++, Python3, Van der whaal, Physics, PDF, Tools');
  });
});
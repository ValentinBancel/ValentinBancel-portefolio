import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentAboutMeComponent } from './component-about-me.component';

describe('ComponentAboutMeComponent', () => {
  let fixture: ComponentFixture<ComponentAboutMeComponent>;
  let component: ComponentAboutMeComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentAboutMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have history property defined', () => {
    expect(component.history).toBeDefined();
  });

  it('should have history property initialized as empty array', () => {
    expect(component.history).toEqual([[]]);
  });

  it('should be able to change history property', () => {
    const newHistory = [[{ text: 'Test', image: 'Test.jpg' }]];
    component.history = newHistory;
    expect(component.history).toEqual(newHistory);
  });
});

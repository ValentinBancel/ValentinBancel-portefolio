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

  it('should initialize finalHistory as history when history length is less than 2', () => {
    component.history = [[{ text: 'Test1', image: 'Test1.jpg' }]];
    component.ngOnInit();
    expect(component.finalHistory).toEqual(component.history);
  });

  it('test with one history', () => {
    component.history = [['Test1','Test1.jpg' ]];
    component.ngOnInit();
    expect(component.finalHistory[0]).toEqual(component.history[0]);
  })
  
  it('test with many history', () => {
    component.history = [['Test1', 'Test1.jpg' ], ['Test2','Test2.jpg' ], ['Test3','Test3.jpg' ]];
    component.ngOnInit();
    expect(component.finalHistory[1]).toEqual(component.history[0]);
    expect(component.finalHistory[2]).toEqual(component.history[1]);
  });
});

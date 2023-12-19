import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAboutMeComponent } from './component-about-me.component';

describe('ComponentAboutMeComponent', () => {
  let component: ComponentAboutMeComponent;
  let fixture: ComponentFixture<ComponentAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAboutMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentProjectCardComponent } from './component-project-card.component';

describe('ComponentProjectCardComponent', () => {
  let component: ComponentProjectCardComponent;
  let fixture: ComponentFixture<ComponentProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentProjectCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

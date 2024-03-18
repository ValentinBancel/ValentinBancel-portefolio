import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component'; // import the module that contains ProjectComponent

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectComponent ] // import the module here
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
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
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchievementComponent } from './archievement.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';

describe('ArchievementComponent', () => {
  let component: ArchievementComponent;
  let fixture: ComponentFixture<ArchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ArchievementComponent, HeaderComponent, FooterComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have HeaderComponent in the template', () => {
    const headerElement = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerElement).toBeTruthy();
  });

  it('should have FooterComponent in the template', () => {
    const footerElement = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerElement).toBeTruthy();
  });

  it('should have achievementList defined', () => {
    expect(component.achievementList).toBeDefined();
  });

  it('should check if achievementList is an array', () => {
    expect(Array.isArray(component.achievementList)).toBeTruthy();
  });
});
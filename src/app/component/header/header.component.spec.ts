import { waitForAsync,ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router: Router;
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        providers: [
          { provide: Router, useClass: MockRouter }
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should set actual_route to current route on creation', () => {
      expect(component.actual_route).toEqual(router.url);
    });
  
    it('isCurrentRoute should return current route', () => {
      expect(component.isCurrentRoute()).toEqual(router.url);
    });
  });
  
  class MockRouter {
    public url = '/mock-url';
  }
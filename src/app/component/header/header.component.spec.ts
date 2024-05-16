import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have actual_route defined', () => {
        expect(component.actual_route).toBeDefined();
    });

    it('should return correct value from isCurrentRoute', () => {
        const testRoute = '/';
        component.actual_route = testRoute;
        expect(component.isCurrentRoute()).toEqual(testRoute);
    });
});
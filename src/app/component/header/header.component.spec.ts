import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('Router', ['navigate'], { url: '/' });

        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                { provide: Router, useValue: spy }
            ]
        })
        .compileComponents();

        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have navItems defined', () => {
        expect(component.navItems).toBeDefined();
        expect(component.navItems.length).toBeGreaterThan(0);
    });

    it('should return current route from currentRoute getter', () => {
        routerSpy.url = '/project';
        expect(component.currentRoute).toEqual('/project');
    });
});
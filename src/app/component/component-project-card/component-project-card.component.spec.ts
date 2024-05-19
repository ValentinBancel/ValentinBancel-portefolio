import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentProjectCardComponent } from './component-project-card.component';

describe('ComponentProjectCardComponent', () => {
    let component: ComponentProjectCardComponent;
    let fixture: ComponentFixture<ComponentProjectCardComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentProjectCardComponent);
        component = fixture.componentInstance;
        component.project = [
            {
                title: 'Test Project',
                description: 'This is a test project',
                image: 'assets/test_image.webp',
                link: 'https://test.com',
                tags: ['test']
            }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have project defined', () => {
        expect(component.project).toBeDefined();
    });

    it('should check if project is an array', () => {
        expect(Array.isArray(component.project)).toBeTruthy();
    });

    it('should have correct data in project', () => {
        const expectedProject = [
            {
                title: 'Test Project',
                description: 'This is a test project',
                image: 'assets/test_image.webp',
                link: 'https://test.com',
                tags: ['test']
            }
        ];
        expect(component.project).toEqual(expectedProject);
    });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../models';

describe('ProjectCardComponent', () => {
    let component: ProjectCardComponent;
    let fixture: ComponentFixture<ProjectCardComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectCardComponent);
        component = fixture.componentInstance;
        component.project = {
            title: 'Test Project',
            description: 'This is a test project',
            image: 'assets/test_image.webp',
            link: 'https://test.com',
            tags: ['test']
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have project defined', () => {
        expect(component.project).toBeDefined();
    });

    it('should have correct project title', () => {
        expect(component.project.title).toEqual('Test Project');
    });

    it('should have correct data in project', () => {
        const expectedProject: Project = {
            title: 'Test Project',
            description: 'This is a test project',
            image: 'assets/test_image.webp',
            link: 'https://test.com',
            tags: ['test']
        };
        expect(component.project).toEqual(expectedProject);
    });
});
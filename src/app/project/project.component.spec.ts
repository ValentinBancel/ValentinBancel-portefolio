import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;
    let project: any;
	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
    it('should have a ProjectList property', () => {
        expect(component.ProjectList).toBeDefined();
    });

    it('should have a title', () => {
        expect(component.ProjectList[0].title).toBe('Force de Van Der Whaal');
        });
    
        it('should have a description', () => {
        expect(component.ProjectList[0].description).toBe('En C++, j\'ai réalisé un programme qui permet de calculer la force de Van Der Whaal entre deux molécules.');
        });
    
        it('should have an image', () => {
        expect(component.ProjectList[0].image).toBe('assets/logo_force_de_van_der_whaal.webp');
        });
    
        it('should have a link', () => {
        expect(component.ProjectList[0].link).toBe('https://github.com/ValentinBancel/Force_de_van_der_Waals');
        });
    
        it('should have tags', () => {
        expect(component.ProjectList[0].tags).toEqual(["c++",'Physics', 'Van der whaal']);
        });
});
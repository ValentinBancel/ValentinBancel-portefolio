import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';

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
    expect(component.ProjectList[0].title).toBe('DataLink');
    });

    it('should have a description', () => {
    expect(component.ProjectList[0].description).toBe('DataLink est un ORM custom pour multiple database. (Il est en cours de developpement)');
    });

    it('should have an image', () => {
    expect(component.ProjectList[0].image).toBe('../../../assets/Datalink_project.png');
    });

    it('should have a link', () => {
    expect(component.ProjectList[0].link).toBe('https://github.com/ValentinBancel/DataLink');
    });

    it('should have tags', () => {
    expect(component.ProjectList[0].tags).toEqual(['Python3', 'ORM', 'Database', "Neo4j", "PostgreSQL", "MySQL", "SQLite"]);
    });
});
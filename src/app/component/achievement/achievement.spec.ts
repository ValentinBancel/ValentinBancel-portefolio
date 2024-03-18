import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AchievementComponent } from './achievement';

describe('AchievementComponent', () => {
    let component: AchievementComponent;
    let fixture: ComponentFixture<AchievementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AchievementComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AchievementComponent);
        component = fixture.componentInstance;
        component.achievement = {
            title: 'Test Achievement',
            image: 'assets/test_image.webp'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have achievement defined', () => {
        expect(component.achievement).toBeDefined();
    });
});
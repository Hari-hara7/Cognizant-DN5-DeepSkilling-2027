import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { CourseCardComponent } from './course-card';
import type { Course } from '../../models/course.model';

describe('CourseCard', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
    startDate: new Date('2026-11-01'),
    fee: 4500,
    progress: 72.5
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the course name from input', () => {
    component.course = mockCourse;

    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(heading.textContent).toContain('DATA STRUCTURES');
  });

  it('should emit the course id when enroll is clicked', () => {
    component.course = mockCourse;
    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');

    fixture.detectChanges();

    const enrollButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement as HTMLButtonElement;
    enrollButton.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should log changes in ngOnChanges', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const changes = {
      course: new SimpleChange(undefined, mockCourse, true)
    };

    component.ngOnChanges(changes);

    expect(logSpy).toHaveBeenCalledWith('Course changed', changes);
    logSpy.mockRestore();
  });

  it('should mark four-credit courses as full cards', () => {
    component.course = mockCourse;

    expect(component.cardClasses).toEqual({
      'card--full': true,
      expanded: false
    });
  });
});

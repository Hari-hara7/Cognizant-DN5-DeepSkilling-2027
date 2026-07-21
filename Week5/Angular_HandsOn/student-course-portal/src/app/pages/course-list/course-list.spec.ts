import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CourseListComponent } from './course-list';
import type { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

describe('CourseList', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;
  const mockCourses: Course[] = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      startDate: new Date('2026-11-01'),
      fee: 4500,
      progress: 72.5
    },
    {
      id: 2,
      name: 'Operating Systems',
      code: 'CS201',
      credits: 3,
      gradeStatus: 'pending',
      startDate: new Date('2026-12-01'),
      fee: 5000,
      progress: 15
    }
  ];
  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: CourseService,
          useValue: {
            getCourses: () => of(mockCourses),
            createCourse: () => of(mockCourses[0]),
            updateCourse: () => of(mockCourses[0]),
            deleteCourse: () => of(undefined)
          }
        },
        {
          provide: EnrollmentService,
          useValue: {
            getStudentsByCourse: () => of([])
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({})
            },
            queryParamMap: of(convertToParamMap({}))
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn()
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course cards from the store state', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  it('should show the loading indicator when the store is loading', () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });

    store.refreshState();
    fixture.detectChanges();

    const paragraphs = fixture.debugElement
      .queryAll(By.css('p'))
      .map((paragraph) => (paragraph.nativeElement as HTMLElement).textContent ?? '');
    expect(paragraphs.some((text) => text.includes('Loading courses...'))).toBe(true);
  });
});

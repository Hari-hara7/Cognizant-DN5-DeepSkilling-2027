import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CourseService } from './course';
import type { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/courses';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get courses from the expected URL', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(mockCourses);
  });

  it('should emit an error message when getCourses fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    service.getCourses().subscribe({
      next: () => {
        throw new Error('Expected getCourses to fail');
      },
      error: (error: Error) => {
        expect(error.message).toBe('Failed to load courses. Please try again.');
      }
    });

    for (let attempt = 0; attempt < 3; attempt++) {
      const request = httpMock.expectOne(apiUrl);
      request.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    }

    consoleSpy.mockRestore();
  });
});

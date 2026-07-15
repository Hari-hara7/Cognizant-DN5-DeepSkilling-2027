import { Injectable } from '@angular/core';
import type { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Angular',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      startDate: new Date('2026-08-01'),
      fee: 4999,
      progress: 92.45
    },
    {
      id: 2,
      name: 'Spring Boot',
      code: 'CS102',
      credits: 3,
      gradeStatus: 'pending',
      startDate: new Date('2026-08-12'),
      fee: 5499,
      progress: 64.2
    },
    {
      id: 3,
      name: 'Java',
      code: 'CS103',
      credits: 4,
      gradeStatus: 'failed',
      startDate: new Date('2026-09-03'),
      fee: 3999,
      progress: 48.75
    },
    {
      id: 4,
      name: 'SQL',
      code: 'CS104',
      credits: 1,
      gradeStatus: 'passed',
      startDate: new Date('2026-09-20'),
      fee: 2999,
      progress: 88.1
    },
    {
      id: 5,
      name: 'Microservices',
      code: 'CS105',
      credits: 2,
      gradeStatus: 'pending',
      startDate: new Date('2026-10-05'),
      fee: 5999,
      progress: 0
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}

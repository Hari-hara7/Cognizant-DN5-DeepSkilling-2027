import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import type { Course } from '../models/course.model';
import { CourseService } from '../services/course';

export const courseResolver: ResolveFn<Course | undefined> = (route) => {
  const courseService = inject(CourseService);
  const id = Number(route.paramMap.get('id'));

  return courseService.getCourseById(id);
};

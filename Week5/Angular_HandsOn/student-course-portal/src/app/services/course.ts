import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import type { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map((courses) => courses.filter((course) => course.credits > 0)),
      retry(2),
      // tap is for side effects like logging; map stays reserved for data transformations.
      tap((courses) => console.log('Courses loaded:', courses.length)),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load course details. Please try again.'));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

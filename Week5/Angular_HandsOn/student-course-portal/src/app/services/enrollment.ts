import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import type { Course } from '../models/course.model';

export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  preferredSemester: string;
}

export interface EnrollmentRequest {
  studentName: string;
  studentEmail: string;
  courseId: number;
  preferredSemester: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly apiUrl = 'http://localhost:3000';
  private enrolledCourseIds: number[] = [];

  constructor(private http: HttpClient) {}

  enroll(courseId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}/enrollments`, {
      studentId: 1,
      courseId,
      preferredSemester: 'Odd'
    }).pipe(
      tap(() => this.cacheEnrollment(courseId))
    );
  }

  createEnrollment(request: EnrollmentRequest): Observable<Enrollment> {
    return this.createStudent(request.studentName, request.studentEmail).pipe(
      switchMap((student) => this.http.post<Enrollment>(`${this.apiUrl}/enrollments`, {
        studentId: student.id,
        courseId: request.courseId,
        preferredSemester: request.preferredSemester
      })),
      tap((enrollment) => this.cacheEnrollment(enrollment.courseId))
    );
  }

  unenroll(courseId: number): Observable<void> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/enrollments?courseId=${courseId}`).pipe(
      switchMap((enrollments) => {
        const deletes = enrollments.map((enrollment) =>
          this.http.delete<void>(`${this.apiUrl}/enrollments/${enrollment.id}`)
        );

        return deletes.length ? forkJoin(deletes).pipe(map(() => undefined)) : of(undefined);
      }),
      tap(() => {
        this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
      })
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/enrollments?courseId=${courseId}`).pipe(
      switchMap((enrollments) => {
        const studentIds = new Set(enrollments.map((enrollment) => Number(enrollment.studentId)));

        return this.http.get<Student[]>(`${this.apiUrl}/students`).pipe(
          map((students) => students.filter((student) => studentIds.has(Number(student.id))))
        );
      })
    );
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
      switchMap((enrollments) => {
        const courseIds = new Set(enrollments.map((enrollment) => Number(enrollment.courseId)));

        return this.http.get<Course[]>(`${this.apiUrl}/courses`).pipe(
          map((courses) => courses.filter((course) => courseIds.has(Number(course.id))))
        );
      })
    );
  }

  private createStudent(name: string, email: string): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, { name, email });
  }

  private cacheEnrollment(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }
}

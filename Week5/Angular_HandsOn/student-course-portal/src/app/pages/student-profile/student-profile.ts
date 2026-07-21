import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import type { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  enrolledCourses$: Observable<Course[]>;

  constructor(private enrollmentService: EnrollmentService) {
    this.enrolledCourses$ = this.enrollmentService.getEnrolledCourses();
  }
}

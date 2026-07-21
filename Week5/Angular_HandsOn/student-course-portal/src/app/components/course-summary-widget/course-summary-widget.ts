import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import type { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent {
  courses$: Observable<Course[]>;

  constructor(private courseService: CourseService) {
    this.courses$ = this.courseService.getCourses();
  }

  addDemoCourse(courseCount: number): void {
    const nextId = courseCount + 1;

    this.courseService.createCourse({
      name: `Elective ${nextId}`,
      code: `CS${100 + nextId}`,
      credits: 2,
      gradeStatus: 'pending',
      startDate: new Date('2026-11-01'),
      fee: 3499,
      progress: 0
    }).subscribe(() => {
      this.courses$ = this.courseService.getCourses();
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent {
  constructor(private courseService: CourseService) {}

  get courseCount(): number {
    return this.courseService.getCourses().length;
  }

  addDemoCourse(): void {
    const nextId = this.courseCount + 1;

    this.courseService.addCourse({
      id: nextId,
      name: `Elective ${nextId}`,
      code: `CS${100 + nextId}`,
      credits: 2,
      gradeStatus: 'pending',
      startDate: new Date('2026-11-01'),
      fee: 3499,
      progress: 0
    });
  }
}

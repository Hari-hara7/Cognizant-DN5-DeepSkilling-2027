import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label';
import type { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {

  @Input()
  course!: Course;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  get cardClasses() {
    // A getter keeps conditional class logic out of the template as the UI grows.
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': (this.course.credits ?? 0) >= 4,
      expanded: this.isExpanded
    };
  }

  get cardStyles() {
    const borderColors = {
      passed: 'green',
      failed: 'red',
      pending: 'grey'
    };

    return {
      borderLeftColor: borderColors[this.course.gradeStatus]
    };
  }

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course changed', changes);
  }

  enroll(){
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }

    this.enrollRequested.emit(this.course.id);

  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

}

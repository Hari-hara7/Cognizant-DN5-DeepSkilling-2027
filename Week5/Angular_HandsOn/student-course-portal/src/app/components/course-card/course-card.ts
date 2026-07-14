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
import type { Course } from '../../pages/course-list/course-list';

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

  get cardClasses() {
    // A getter keeps conditional class logic out of the template as the UI grows.
    return {
      'card--enrolled': this.course.enrolled,
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course changed', changes);
  }

  enroll(){

    this.enrollRequested.emit(this.course.id);

  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

}

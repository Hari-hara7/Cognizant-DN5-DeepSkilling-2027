import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreditLabelPipe } from '../../pipes/credit-label';
import type { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

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

  @Output()
  courseSelected = new EventEmitter<number>();

  isExpanded = false;
  enrolledIds$: Observable<number[]>;

  constructor(private store: Store) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  get cardClasses() {
    // A getter keeps conditional class logic out of the template as the UI grows.
    return {
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

  enroll(isEnrolled: boolean){
    if (isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }

    this.enrollRequested.emit(this.course.id);
  }

  selectCourse(): void {
    this.courseSelected.emit(this.course.id);
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

}

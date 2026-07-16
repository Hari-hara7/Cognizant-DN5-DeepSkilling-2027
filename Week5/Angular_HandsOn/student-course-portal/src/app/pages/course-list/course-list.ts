import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';
import { HighlightDirective } from '../../directives/highlight';
import type { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { EnrollmentService, Student } from '../../services/enrollment';

@Component({
  selector:'app-course-list',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    CourseCardComponent,
    CourseSummaryWidgetComponent,
    HighlightDirective
  ],
  templateUrl:'./course-list.html',
  styleUrl:'./course-list.css'
})

export class CourseListComponent implements OnInit{
private readonly destroyRef = inject(DestroyRef);
private readonly selectedCourseId$ = new Subject<number>();

isLoading = true;

courses: Course[] = [];
enrolledStudents: Student[] = [];
errorMessage = '';
courseMessage = '';

searchTerm = '';

selectedCourseId:number|null=null;

newCourse: Omit<Course, 'id'> = {
  name: '',
  code: '',
  credits: 1,
  gradeStatus: 'pending',
  startDate: new Date('2026-11-01'),
  fee: 0,
  progress: 0
};

editCourseId: number | null = null;

constructor(
  private courseService: CourseService,
  private enrollmentService: EnrollmentService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  this.loadCourses();

  this.selectedCourseId$.pipe(
    // switchMap cancels the previous student request when a newer courseId arrives.
    switchMap((courseId) => this.enrollmentService.getStudentsByCourse(courseId)),
    takeUntilDestroyed(this.destroyRef)
  ).subscribe({
    next: (students) => {
      this.enrolledStudents = students;
    },
    error: (err) => {
      this.errorMessage = err.message;
    }
  });
}

get filteredCourses(): Course[] {
  const search = this.searchTerm.trim().toLowerCase();

  if (!search) {
    return this.courses;
  }

  return this.courses.filter((course) => {
    return course.name.toLowerCase().includes(search) || course.code.toLowerCase().includes(search);
  });
}

trackByCourseId(index: number, course: Course): number {
  // trackBy lets Angular reuse unchanged DOM nodes instead of re-rendering the whole list.
  return course.id;
}

onEnroll(id:number){

console.log("Enrollment changed for course:",id);

this.selectedCourseId=id;
this.selectedCourseId$.next(id);

}

loadCourses(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.courseService.getCourses().pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe({
    next: (courses) => {
      this.courses = courses;
    },
    error: (err) => {
      this.errorMessage = err.message;
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

saveCourse(): void {
  const request = {
    ...this.newCourse,
    credits: Number(this.newCourse.credits),
    startDate: new Date(this.newCourse.startDate),
    fee: Number(this.newCourse.fee),
    progress: Number(this.newCourse.progress)
  };

  const save$ = this.editCourseId === null
    ? this.courseService.createCourse(request)
    : this.courseService.updateCourse(this.editCourseId, request);

  save$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next: () => {
      this.courseMessage = this.editCourseId === null ? 'Course created.' : 'Course updated.';
      this.resetCourseForm();
      this.loadCourses();
    },
    error: (err) => {
      this.errorMessage = err.message;
    }
  });
}

editCourse(course: Course): void {
  this.editCourseId = course.id;
  this.newCourse = {
    name: course.name,
    code: course.code,
    credits: course.credits,
    gradeStatus: course.gradeStatus,
    startDate: new Date(course.startDate),
    fee: course.fee,
    progress: course.progress
  };
}

deleteCourse(courseId: number): void {
  this.courseService.deleteCourse(courseId).pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe({
    next: () => {
      this.courseMessage = 'Course deleted.';
      this.loadCourses();
    },
    error: (err) => {
      this.errorMessage = err.message;
    }
  });
}

resetCourseForm(): void {
  this.editCourseId = null;
  this.newCourse = {
    name: '',
    code: '',
    credits: 1,
    gradeStatus: 'pending',
    startDate: new Date('2026-11-01'),
    fee: 0,
    progress: 0
  };
}

onSearchChange(): void {
  const search = this.searchTerm.trim();

  this.router.navigate(['/courses'], {
    queryParams: { search: search || null },
    queryParamsHandling: 'merge'
  });
}

openCourse(courseId: number): void {
  this.router.navigate(['/courses', courseId]);
}

}

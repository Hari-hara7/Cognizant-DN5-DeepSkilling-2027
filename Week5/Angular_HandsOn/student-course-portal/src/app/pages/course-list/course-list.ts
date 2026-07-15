import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';
import { HighlightDirective } from '../../directives/highlight';
import type { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';

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

isLoading = true;

courses: Course[] = [];

searchTerm = '';

selectedCourseId:number|null=null;

constructor(
  private courseService: CourseService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.courses = this.courseService.getCourses();
  this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';

  setTimeout(() => {
    this.isLoading = false;
  }, 1500);
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

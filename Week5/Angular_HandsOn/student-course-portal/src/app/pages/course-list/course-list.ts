import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

selectedCourseId:number|null=null;

constructor(private courseService: CourseService) {}

ngOnInit(): void {
  this.courses = this.courseService.getCourses();

  setTimeout(() => {
    this.isLoading = false;
  }, 1500);
}

trackByCourseId(index: number, course: Course): number {
  // trackBy lets Angular reuse unchanged DOM nodes instead of re-rendering the whole list.
  return course.id;
}

onEnroll(id:number){

console.log("Enrollment changed for course:",id);

this.selectedCourseId=id;

}

}

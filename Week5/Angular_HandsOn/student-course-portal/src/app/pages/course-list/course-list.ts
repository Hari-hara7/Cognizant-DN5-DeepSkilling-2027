import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number | null;
  gradeStatus: 'passed' | 'failed' | 'pending';
  enrolled: boolean;
  startDate: Date;
  fee: number;
  progress: number;
}

@Component({
  selector:'app-course-list',
  standalone:true,
  imports:[
    CommonModule,
    CourseCardComponent,
    HighlightDirective
  ],
  templateUrl:'./course-list.html',
  styleUrl:'./course-list.css'
})

export class CourseListComponent implements OnInit{

isLoading = true;

courses: Course[] = [

{
id:1,
name:'Angular',
code:'CS101',
credits:4,
gradeStatus:'passed',
enrolled:false,
startDate:new Date('2026-08-01'),
fee:4999,
progress:92.45
},

{
id:2,
name:'Spring Boot',
code:'CS102',
credits:3,
gradeStatus:'pending',
enrolled:false,
startDate:new Date('2026-08-12'),
fee:5499,
progress:64.2
},

{
id:3,
name:'Java',
code:'CS103',
credits:4,
gradeStatus:'failed',
enrolled:false,
startDate:new Date('2026-09-03'),
fee:3999,
progress:48.75
},

{
id:4,
name:'SQL',
code:'CS104',
credits:1,
gradeStatus:'passed',
enrolled:false,
startDate:new Date('2026-09-20'),
fee:2999,
progress:88.1
},

{
id:5,
name:'Microservices',
code:'CS105',
credits:null,
gradeStatus:'pending',
enrolled:false,
startDate:new Date('2026-10-05'),
fee:5999,
progress:0
}

];

selectedCourseId:number|null=null;

ngOnInit(): void {
  setTimeout(() => {
    this.isLoading = false;
  }, 1500);
}

trackByCourseId(index: number, course: Course): number {
  // trackBy lets Angular reuse unchanged DOM nodes instead of re-rendering the whole list.
  return course.id;
}

onEnroll(id:number){

console.log("Enrolling in course:",id);

this.selectedCourseId=id;

this.courses = this.courses.map((course) => ({
  ...course,
  enrolled: course.id === id ? true : course.enrolled
}));

}

}

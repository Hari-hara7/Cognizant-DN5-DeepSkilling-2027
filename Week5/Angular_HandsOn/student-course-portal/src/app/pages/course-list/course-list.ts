import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';

@Component({
  selector:'app-course-list',
  standalone:true,
  imports:[
    CommonModule,
    CourseCardComponent
  ],
  templateUrl:'./course-list.html',
  styleUrl:'./course-list.css'
})

export class CourseListComponent{

courses=[

{
id:1,
name:'Angular',
code:'CS101',
credits:4
},

{
id:2,
name:'Spring Boot',
code:'CS102',
credits:3
},

{
id:3,
name:'Java',
code:'CS103',
credits:4
},

{
id:4,
name:'SQL',
code:'CS104',
credits:3
},

{
id:5,
name:'Microservices',
code:'CS105',
credits:4
}

];

selectedCourseId:number|null=null;

onEnroll(id:number){

console.log("Enrolling in course:",id);

this.selectedCourseId=id;

}

}

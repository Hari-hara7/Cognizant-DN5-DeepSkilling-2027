import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form';

export const routes: Routes = [

{
path:'',
component:HomeComponent
},

{
path:'courses',
component:CourseListComponent
},

{
path:'profile',
component:StudentProfile
},

{
path:'enroll',
component:EnrollmentFormComponent
}

];

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

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
component:StudentProfile,
canActivate:[authGuard]
},

{
path:'enroll',
loadComponent:() => import('./pages/enrollment-form/enrollment-form').then((m) => m.EnrollmentFormComponent),
canDeactivate:[unsavedChangesGuard]
},

{
path:'enroll-reactive',
component:ReactiveEnrollmentFormComponent
}

];

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';
import { courseResolver } from './resolvers/course.resolver';

export const routes: Routes = [

{
path:'',
component:HomeComponent
},

{
path:'courses',
component:CoursesLayoutComponent,
children:[
  {
  path:'',
  component:CourseListComponent
  },
  {
  path:':id',
  component:CourseDetailComponent,
  resolve:{ course: courseResolver }
  }
]
},

{
path:'profile',
component:StudentProfile,
canActivate:[authGuard]
},

{
path:'enroll',
loadChildren:() => import('./features/enrollment/enrollment.module').then((m) => m.EnrollmentModule),
canActivate:[authGuard]
},

{
path:'enroll-reactive',
redirectTo:'enroll/reactive',
pathMatch:'full'
},

{
path:'**',
component:NotFoundComponent
}

];

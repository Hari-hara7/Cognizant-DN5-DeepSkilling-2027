import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllCourses } from '../course/course.selectors';
import { enrollmentFeatureKey, EnrollmentState } from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>(enrollmentFeatureKey);

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter((course) => enrolledIds.includes(course.id))
);

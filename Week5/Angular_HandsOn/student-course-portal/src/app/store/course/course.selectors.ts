import { createFeatureSelector, createSelector } from '@ngrx/store';
import { courseFeatureKey, CourseState } from './course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>(courseFeatureKey);

export const selectAllCourses = createSelector(
  selectCourseState,
  (state) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state) => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state) => state.error
);

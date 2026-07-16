import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import type { CanLeaveDirtyForm } from '../../guards/unsaved-changes.guard';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentFormComponent implements CanLeaveDirtyForm {
  @ViewChild('enrollForm')
  enrollForm?: NgForm;

  submitted = false;
  errorMessage = '';

  enrollmentRequest = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: '',
    agreeToTerms: false,
  };

  constructor(private enrollmentService: EnrollmentService) {}

  onSubmit(form: NgForm): void {
    console.log('Enrollment form value:', form.value);
    console.log('Enrollment form valid:', form.valid);

    if (form.valid && this.enrollmentRequest.courseId !== null) {
      this.enrollmentService.createEnrollment({
        studentName: this.enrollmentRequest.studentName,
        studentEmail: this.enrollmentRequest.studentEmail,
        courseId: Number(this.enrollmentRequest.courseId),
        preferredSemester: this.enrollmentRequest.preferredSemester
      }).subscribe({
        next: () => {
          this.submitted = true;
          this.errorMessage = '';
          form.resetForm();
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  canDeactivate(): boolean {
    if (this.submitted || !this.enrollForm?.dirty) {
      return true;
    }

    return confirm('You have unsaved enrollment changes. Leave this page?');
  }
}

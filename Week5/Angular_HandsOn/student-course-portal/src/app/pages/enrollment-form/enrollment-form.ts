import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import type { CanLeaveDirtyForm } from '../../guards/unsaved-changes.guard';

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

  enrollmentRequest = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: '',
    agreeToTerms: false,
  };

  onSubmit(form: NgForm): void {
    console.log('Enrollment form value:', form.value);
    console.log('Enrollment form valid:', form.valid);

    if (form.valid) {
      this.submitted = true;
      form.resetForm();
    }
  }

  canDeactivate(): boolean {
    if (this.submitted || !this.enrollForm?.dirty) {
      return true;
    }

    return confirm('You have unsaved enrollment changes. Leave this page?');
  }
}

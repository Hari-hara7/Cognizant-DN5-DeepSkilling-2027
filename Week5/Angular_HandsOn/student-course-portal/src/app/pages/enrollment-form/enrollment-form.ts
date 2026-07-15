import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentFormComponent {
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
    }
  }
}

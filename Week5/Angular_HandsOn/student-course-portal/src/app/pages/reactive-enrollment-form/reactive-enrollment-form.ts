import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import type { CanLeaveDirtyForm } from '../../guards/unsaved-changes.guard';

export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();

  return value.startsWith('XX') ? { noCourseCode: true } : null;
}

export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  const value = String(control.value ?? '').toLowerCase();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanLeaveDirtyForm {
  submitted = false;

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array<FormControl<string | null>>([]),
    });
  }

  get additionalCourses(): FormArray<FormControl<string | null>> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string | null>>;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('Reactive form value:', this.enrollForm.value);
    console.log('Reactive form raw value:', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.submitted = true;
      this.enrollForm.markAsPristine();
    }
  }

  canDeactivate(): boolean {
    if (this.submitted || !this.enrollForm?.dirty) {
      return true;
    }

    return window.confirm('You have unsaved changes. Leave?');
  }
}

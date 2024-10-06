import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplication } from '@core/models/job-application';
import { User } from '@core/models/user';
import { JobService } from '@core/services';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';
import { MessageService } from 'primeng/api';
import { minDateValidator } from './min-date-validator';

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrl: './apply-to-job.component.scss',
})
export class ApplyToJobComponent {
  jobId!: string | number;
  userId!: string;
  jobApplication!: JobApplication;
  applyToJobForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private storage: LocalStorageService,
    private userService: UserService,
    private jobService: JobService,
    private fb: FormBuilder
  ) {
    this.jobId = this.route.snapshot.paramMap.get('job-id') || '0';
    this.userId = this.storage.getUserId();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.getUser();
    this.applyToJobForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{11}$')]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      availableStartDate: [
        '',
        [
          Validators.required,
          // minDateValidator(tomorrow)
        ],
      ],
      reasonOfHire: ['', Validators.required],
      qualifications: ['', Validators.required],
      linkedIn: [
        '',
        [
          Validators.required,
          //   Validators.pattern('https?://(?:www\\.)?linkedin\\.com/.*'),
        ],
      ],
      github: [
        '',
        [
          Validators.required,
          //   Validators.pattern('https?://(?:www\\.)?github\\.com/.*'),
        ],
      ],
      status: ['', Validators.required],
    });
  }
  getUser(): void {
    this.userService.getUserProfile(this.userId).subscribe((user: User) => {
      this.applyToJobForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        status: 'pending',
      });
    });
  }
  get applyToJobFormControls() {
    return this.applyToJobForm.controls;
  }

  onApplyToJob(): void {
    if (this.applyToJobForm.invalid) {
      this.applyToJobForm.markAllAsTouched();
      this.messageService.add({
        icon: 'pi pi-times',
        summary: 'Warning',
        detail: 'Please Fill in all the Fields',
        life: 2500,
      });
      return;
    }

    Object.keys(this.applyToJobForm.value).forEach((key) => {
      console.log(`${key}: ${this.applyToJobForm.value[key]}`);
    });
    this.jobService
      .applyToJob(this.applyToJobForm.value, this.jobId, this.userId)
      .subscribe(() => {
        this.messageService.add({
          icon: 'pi pi-check',
          summary: 'Yaay!',
          detail: 'You applied to this job successfully',
          life: 2500,
        });
        setTimeout(() => {
          window.history.back();
        }, 3000);
      });
  }
}

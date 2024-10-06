import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryIcons } from '@core/models/category';
import { Job } from '@core/models/job';
import { JobApplication } from '@core/models/job-application';
import { CategoryService, JobService } from '@core/services';
import { AdminService } from '@core/services/admin/admin.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';
import { formatDistanceToNow } from 'date-fns';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  jobId!: string | number;
  job!: Job;
  isAppliedTo: boolean = false;
  role!: string;
  userId!: string;
  postedIn!: string;
  isBookmarked!: boolean;
  relatedJobs!: Job[];
  responsibilities!: string[];
  qualifications!: string[];
  benefits!: string[];

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private storage: LocalStorageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.role = this.storage.getRole();
    this.userId = this.storage.getUserId();
    this.loadJobDetails();
  }
  // add to utils
  formatRelativeTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  formatToList: any = (str: string) => {
    return str
      .split(/[,\.]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  // Get Page Data
  loadJobDetails(): void {
    this.jobId = this.route.snapshot.paramMap.get('job-id') || '0';
    this.jobService.getJobById(this.jobId).subscribe((job) => {
      this.job = job;
      if (!this.job.company?.id) {
        console.warn('Company ID is not available');
        return;
      }
      this.adminService
        .getCompanyLogo(this.job.company?.id)
        // .getCompanyLogo(this.job.company?.id)
        .subscribe((blob) => {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.job.company.logo = event.target.result;
          };
          reader.readAsDataURL(blob);
        });
      this.job.category.icon = categoryIcons[this.job.category.name];
      this.postedIn = this.formatRelativeTime(this.job.createdAt as Date);
      this.isInTheAppliedList();
      this.responsibilities = this.formatToList(job.responsibilities);
      this.qualifications = this.formatToList(job.qualifications);
      job.benefits ? (this.benefits = this.formatToList(job.benefits)) : null;
      this.isInSavedJobsList(this.userId);
      this.getRelatedJobs();
    });
  }

  // Get Related Jobs
  getRelatedJobs(): void {
    this.categoryService
      .getJobsByCategory(this.job.category.id)
      .subscribe(
        (jobs) =>
          (this.relatedJobs = jobs.sort(() => 0.5 - Math.random()).slice(0, 3))
      );
  }

  // Save Job
  onSaveJob(): void {
    this.isBookmarked = !this.isBookmarked;
    if (this.isBookmarked) {
      this.userService.saveJob(this.userId, this.jobId).subscribe();
    } else {
      this.userService.unSaveJob(this.jobId).subscribe();
    }
  }
  isInSavedJobsList(userId: string): void {
    if (localStorage.getItem('id')) {
      this.userService
        .isInSavedJobs(userId, this.jobId)
        .subscribe((res: boolean) => {
          this.isBookmarked = res;
        });
    }
  }

  // Apply to job
  onApplyToJob(): void {
    if (this.role === '' || this.userId === '0') {
      this.messageService.add({
        icon: 'pi pi-exclamation-circle',
        summary: 'Heads Up!',
        detail: 'You must Login to Apply for Jobs',
        life: 2500,
      });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else this.router.navigate([`job-details/${this.jobId}/apply-to-job`]);
  }

  isInTheAppliedList(): void {
    this.userService
      .getAppliedJobs(this.userId)
      .subscribe((jobApplications) => {
        jobApplications.forEach((jobApplication: JobApplication) => {
          if (jobApplication.job.id == this.jobId) {
            this.isAppliedTo = true;
          }
        });
      });
  }
}

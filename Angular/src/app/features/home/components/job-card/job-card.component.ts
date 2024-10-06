import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '@core/models/job';
import { AdminService } from '@core/services/admin/admin.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  isBookmarked!: boolean;
  userId!: string;
  role!: string;
  @Input() backgroundColor: string = 'var(--accent-color)';
  @Input() job!: Job;
  @Input() isVertical: boolean = true;
  @Input() isChecked!: boolean;
  logoUrl!: string;
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userId = this.storage.getUserId();
    this.role = this.storage.getRole();
    this.getCompanyLogo();
    this.isInSavedJobsList(this.userId);
  }

  onClicked(jobId: number): void {
    this.router
      .navigateByUrl('/jobs', { skipLocationChange: true })
      .then(() => {
        if (this.router.url !== `/job-details/${jobId}`) {
          this.router.navigate(['/job-details', jobId]);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  getCompanyLogo(): void {
    if (!this.job.company?.id) {
      console.warn('Company ID is not available');
      return;
    }
    this.adminService.getCompanyLogo(this.job.company?.id).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.job.company.logo = event.target.result;
      };
      reader.readAsDataURL(blob);
    });
  }
  onSaveJob(event: Event): void {
    event.stopPropagation();
    this.isBookmarked = !this.isBookmarked;
    if (this.isBookmarked) {
      this.userService.saveJob(this.userId, this.job.id).subscribe();
    } else {
      this.userService.unSaveJob(this.job.id).subscribe();
    }
  }

  isInSavedJobsList(userId: string): void {
    if (this.userId) {
      this.userService
        .isInSavedJobs(userId, this.job.id)
        .subscribe((res: boolean) => {
          this.isBookmarked = res;
        });
    }
  }
}

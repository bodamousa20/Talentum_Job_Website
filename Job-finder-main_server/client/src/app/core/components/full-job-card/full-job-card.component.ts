import { Component, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryIcons } from '@core/models/category';
import { Job } from '@core/models/job';
import { AdminService } from '@core/services/admin/admin.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-full-job-card',
  templateUrl: './full-job-card.component.html',
  styleUrl: './full-job-card.component.scss',
})
export class FullJobCardComponent {
  isBookmarked!: boolean;
  userId!: string;
  role!: string;
  postedIn!: string;
  @Input() backgroundColor: string = 'var(--accent-color)';
  @Input() job!: Job;
  @Input() isAppliedTo: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.role = this.storage.getRole();
    this.userId = this.storage.getUserId();
    this.job.category.icon = categoryIcons[this.job.category.name];
    this.getCompanyLogo();
    this.isInSavedJobsList(this.userId);
    this.postedIn = this.formatRelativeTime(this.job.createdAt as Date);
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

  onSaveJob(): void {
    this.isBookmarked = !this.isBookmarked;
    if (this.isBookmarked) {
      this.userService.saveJob(this.userId, this.job.id).subscribe();
    } else {
      this.userService.unSaveJob(this.job.id).subscribe();
    }
  }

  isInSavedJobsList(userId: string): void {
    if (localStorage.getItem('id')) {
      this.userService
        .isInSavedJobs(userId, this.job.id)
        .subscribe((res: boolean) => {
          this.isBookmarked = res;
        });
    }
  }

  formatRelativeTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // On Job Details Button CLicked
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

  onCompanyClicked(): void {
    this.router.navigateByUrl(`company/${this.job.company.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

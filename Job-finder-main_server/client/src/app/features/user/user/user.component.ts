import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplication } from '@core/models/job-application';
import { Job } from '@core/models/tempCodeRunnerFile';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  userId!: string;
  user!: User;
  role!: string;
  savedJobs: Job[] = [];
  jobApplications: JobApplication[] = [];
  dob!: string;

  constructor(
    public storage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('user-id') || '0';
    this.role = this.storage.getRole();
    this.userService.getUserProfile(this.userId).subscribe((user) => {
      this.user = user;
      this.dob = formatDateToDayMonYear(user.dateOfBirth);
      this.loadSavedJobs();
      this.loadAppliedToJobs();
    });
  }
  loadSavedJobs() {
    if (this.user) {
      this.userService.getSavedJobs(this.userId).subscribe((jobs) => {
        this.savedJobs = jobs;
      });
    }
  }

  loadAppliedToJobs() {
    if (this.user) {
      this.userService
        .getAppliedJobs(this.userId)
        .subscribe((jobApplications) => {
          this.jobApplications = jobApplications;
        });
    }
  }

  goTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToJobsPage() {
    this.router
      .navigate(['../../jobs'])
      .then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}
// should be in another file
function formatDateToDayMonYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-GB', options);
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '@core/models/company';
import { Job } from '@core/models/job';
import { JobApplication } from '@core/models/job-application';
import { AdminService } from '@core/services/admin/admin.service';
import { CompanyService } from '@core/services/company/company.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  companyId!: string;
  role!: string;
  company!: Company;
  createdJobs: Job[] = [];
  paginatedJobs: Job[] = [];
  applicants: JobApplication[] = [];
  paginatedApplicants: JobApplication[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public storage: LocalStorageService,
    private adminService: AdminService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('company-id') || '0';
    this.role = this.storage.getRole();
    this.getCompany();
    this.getAllApplicants();
    this.getCreatedJobs();
  }

  // Load Company Details
  getCompany() {
    this.adminService.getCompanyById(this.companyId).subscribe((company) => {
      // Company
      this.company = company;
      // Company Logo
      //   this.adminService.getCompanyLogo(17).subscribe((blob) => {
      this.adminService.getCompanyLogo(this.companyId).subscribe((blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.company.logo = event.target.result;
        };
        reader.readAsDataURL(blob);
      });
    });
  }

  // Load Company Applicants
  getAllApplicants() {
    this.companyService
      .getAllApplicants(this.companyId)
      .subscribe((applicants) => {
        this.applicants = applicants;
        this.updatePaginatedJobs('applicants');
      });
  }

  // Load Created Jobs
  getCreatedJobs() {
    this.companyService
      .getCompanyJobs(this.companyId)
      .subscribe((jobs: Job[]) => {
        this.createdJobs = jobs;
        this.updatePaginatedJobs('createdJobs');
        this.getApplicantsByJobId();
      });
  }
  getApplicantsByJobId() {
    this.createdJobs.forEach((job: Job) =>
      this.companyService
        .getApplicantsByJob(job.id)
        .subscribe((applicants: JobApplication[]) => {
          job.numOfApplicants = applicants.length;
        })
    );
  }

  // Client Side Pagination
  first = 0;
  rows = 4;
  pageCount!: number;
  totalRecords!: number;
  onPageChange(event: any, listType: string) {
    this.first = event.first;
    this.updatePaginatedJobs(listType);
  }
  updatePaginatedJobs(listType?: string) {
    const start = this.first;
    const end = this.first + this.rows;
    if (listType === 'applicants') {
      this.paginatedApplicants = this.applicants.slice(start, end);
      this.totalRecords = this.applicants.length;
    //   this.goTo('applicants');
    } else if (listType === 'createdJobs') {
      this.paginatedJobs = this.createdJobs.slice(start, end);
      this.totalRecords = this.createdJobs.length;
    //   this.goTo('createdJobs');
    }
  }

  // View Profile
  viewProfile(userId: number | string) {
    this.router.navigate(['../../' + userId]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // Navigate to Specific Section
  goTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

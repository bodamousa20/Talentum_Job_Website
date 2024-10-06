import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from '@core/models/category';
import { Job } from '@core/models/job';
import { JobApplication } from '@core/models/job-application';
import { CategoryService, JobService } from '@core/services';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  userId!: number | string;
  userApplications: JobApplication[] = [];
  filteredJobs: Job[] = [];
  paginatedJobs: Job[] = [];
  categories!: Category[];
  form: any;
  // Filters
  jobCountPerCategory: { [key: number]: number } = {};
  jobTypes: string[] = [];
  cities: string[] = [];
  experiences: string[] = [];
  datePosted = [
    'Last hour',
    'Last 24 hours',
    'Last 7 days',
    'Last 14 days',
    'Last 30 days',
  ];
  rangeValues: number[] = [0, 500000];

  constructor(
    private categoryService: CategoryService,
    private jobService: JobService,
    private userService: UserService,
    private storage: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      titleSearch: [''],
      citySearch: [''],
      experience: [''],
    });
  }

  ngOnInit() {
    this.userId = this.storage.getUserId();
    this.loadCategories();
    this.loadJobs();
    
    this.getJobApplications();
  }

  loadJobs() {
    this.jobService.filterJobs().subscribe((jobs) => {
      this.filteredJobs = jobs;

      //   Separate
      const jobTypeMapping: { [key: string]: string } = {
        'full time': 'Full Time',
        'full-time': 'Full Time',
        'part time': 'Part Time',
        'part-time': 'Part Time',
        internship: 'Internship',
      };
      const existingJobTypes = this.filteredJobs.map(
        (job) => jobTypeMapping[job.type.toLowerCase()] || job.type
      );
      this.jobTypes = Array.from(new Set(existingJobTypes));

      // Separate
      const existingCities = this.filteredJobs
        .map((job) => job.location.split(',')[0].trim())
        .filter((city, index, self) => self.indexOf(city) === index);
      this.cities = Array.from(new Set(existingCities));

      //   Separate
      const existingExperiences = this.filteredJobs.map(
        (job) => job.experience
      );
      this.experiences = Array.from(new Set(existingExperiences));

      this.totalRecords = this.filteredJobs.length;
      this.updatePaginatedJobs();
    });
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  getJobsCountPerCategory(categoryId: number): number {
    return this.filteredJobs?.filter((job) => job.category.id === categoryId)
      .length;
  }

  get titleControl() {
    return this.form.get('titleSearch');
  }
  get cityControl() {
    return this.form.get('citySearch');
  }
  get experienceControl() {
    return this.form.get('experience');
  }

  // Client Side Pagination
  first = 0;
  rows = 6;
  pageCount!: number;
  totalRecords!: number;
  onPageChange(event: any) {
    this.first = event.first;
    this.updatePaginatedJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  updatePaginatedJobs() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedJobs = this.filteredJobs.slice(start, end);
    this.totalRecords = this.filteredJobs.length;
  }

  selectedCategoryIds: number[] = [];
  categoryFilter(event: any) {
    let isCategoryChecked = event.target.checked;
    let categoryId = +event.target.value;
    isCategoryChecked
      ? this.selectedCategoryIds.push(categoryId)
      : (this.selectedCategoryIds = this.selectedCategoryIds.filter(
          (id) => id !== categoryId
        ));
  }

  selectedJobTypes: string[] | undefined = undefined;
  jobTypeFilter(event: any) {
    let isJobTypeChecked = event.target.checked;
    let jobType = event.target.value;
    isJobTypeChecked
      ? this.selectedJobTypes!.push(jobType)
      : (this.selectedJobTypes = this.selectedJobTypes!.filter(
          (type) => type !== jobType
        ));
  }

  applyFilters() {
    console.log(this.selectedCategoryIds);
    console.log(this.titleControl.value);
    console.log(this.selectedJobTypes);
    console.log(this.cityControl.value);
    console.log(this.experienceControl.value);
    this.jobService
      .filterJobs(
        this.selectedCategoryIds,
        this.titleControl.value,
        this.selectedJobTypes,
        this.cityControl.value,
        this.experienceControl.value
      )
      .subscribe((jobs) => {
        this.filteredJobs = jobs;
        this.updatePaginatedJobs();
        this.first = 0;
      });
  }

  //   Show all categories
  showAllCategories: boolean = false;
  showAllCategoriesText: string = 'Show';
  toggleCategories() {
    this.showAllCategories = !this.showAllCategories;
    this.showAllCategoriesText = this.showAllCategories ? 'Hide' : 'Show';
  }

  getJobApplications() {
    this.userService
      .getAppliedJobs(this.userId)
      .subscribe((jobApplications) => {
        this.userApplications = jobApplications;
      });
  }
  isAppliedTo(jobId: number): boolean {
    return this.userApplications
      .map((jobApplication) => jobApplication.job.id)
      .includes(jobId);
  }
}

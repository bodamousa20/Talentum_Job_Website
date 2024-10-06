import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@core/models/category';
import { Company } from '@core/models/company';
import { Job } from '@core/models/job';
import { CategoryService, JobService } from '@core/services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  buttonLabel: string = 'Show ';
  buttonIcon: string = 'pi-arrow-right';
  selectedCardIndex: number | null = null;
  showAllCategories: boolean = false;
  categories: Category[] = [];
  featuredJobs!: Job[];
  latestJobs!: Job[];
  companies!: Company[];
  cities!: string[];

  @ViewChild('jobTitleInput') jobTitleInputElement!: ElementRef;
  @ViewChild('cityInput') cityInputElement!: ElementRef;

  constructor(
    private categoryService: CategoryService,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getCities();
    this.selectedCardIndex = 0;
  }

  getAllCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(
        switchMap((categories) => {
          this.categories = categories;
          return this.jobService.filterJobs([categories[0].id!]);
        })
      )
      .subscribe((jobs) => {
        this.featuredJobs = jobs;
      });
  }

  onCategorySelected(categoryId: number, index: number) {
    this.selectedCardIndex = index;
    this.jobService.filterJobs([categoryId]).subscribe((jobs) => {
      this.featuredJobs = jobs;
    });
  }

  getCities() {
    this.jobService.filterJobs().subscribe((jobs) => {
      const cities = jobs.map((job) => job.location.split(',')[0].trim());
      this.cities = Array.from(new Set(cities)).sort();
    });
  }

  showAll(): void {
    this.buttonIcon = this.showAllCategories
      ? 'pi-arrow-right'
      : 'pi-arrow-down';
    this.buttonLabel = this.showAllCategories ? 'Show ' : 'Hide ';
    this.showAllCategories = !this.showAllCategories;
  }

  scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSearch(): void {
    const jobTitle = this.jobTitleInputElement.nativeElement.value;
    const city = this.cityInputElement.nativeElement.value;
    this.router.navigate(['/jobs'], { queryParams: { jobTitle, city } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@core/models/category';
import { Company } from '@core/models/company';
import { Job } from '@core/models/job';
import { CategoryService } from '@core/services';
import { AdminService } from '@core/services/admin/admin.service';
import { CompanyService } from '@core/services/company/company.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss',
})
export class AddJobComponent {
  blockChars = /^[^<>*!\d]+$/;
  companyId: string;
  company!: Company;
  categories!: Category[];
  addJobForm: FormGroup;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private storage: LocalStorageService,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.companyId = this.storage.getCompanyId();
    this.getCompany();
    this.getCategories();
    this.addJobForm = this.fb.group({
      title: ['', Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      minSalary: ['', Validators.required],
      maxSalary: ['', Validators.required],
      salaryCurrency: ['', Validators.required],
      gender: ['', Validators.required],
      experience: ['', Validators.required],
      description: ['', Validators.required],
      responsibilities: ['', Validators.required],
      qualifications: ['', Validators.required],
      benefits: [''],
    });
  }

  getCompany() {
    this.adminService.getCompanyById(this.companyId).subscribe((company) => {
      this.company = company;
      this.addJobForm.patchValue({
        name: this.company.name,
      });
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  get formControls() {
    return this.addJobForm.controls;
  }

  addJob() {
    if (this.addJobForm.invalid) {
      this.messageService.add({
        icon: 'pi pi-times',
        summary: 'Warning',
        detail: 'Please Fill in all the Fields',
        life: 2500,
      });
      return;
    }
    const minSalary = formatSalary(this.addJobForm.value.minSalary);
    const maxSalary = formatSalary(this.addJobForm.value.maxSalary);
    let salary =
      this.addJobForm.value.salaryCurrency === 'LE'
        ? `${minSalary} ${this.addJobForm.value.salaryCurrency} - ${maxSalary} ${this.addJobForm.value.salaryCurrency}`
        : `${this.addJobForm.value.salaryCurrency}${minSalary} - ${this.addJobForm.value.salaryCurrency}${maxSalary}`;
    console.log(salary);
    let job;
    let categoryId!: string;
    job = {
      ...this.addJobForm.value,
      salary: salary,
    };
    delete job.salaryCurrency;
    delete job.minSalary;
    delete job.maxSalary;
    categoryId = this.formControls['category'].value;
    this.companyService
      .addJob(categoryId, this.companyId, job)
      .subscribe(() => {
        this.messageService.add({
          icon: 'pi pi-check',
          summary: 'Success',
          detail: 'Job Added Successfully',
          life: 2500,
        });
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route }).then(() => {
            document
              .getElementById('createdJobs')
              ?.scrollIntoView({ behavior: 'smooth' });
          });
        }, 3000);
      });
  }
}
function formatSalary(value: number): string {
  return `${(value / 1000).toFixed(0)}K`;
}

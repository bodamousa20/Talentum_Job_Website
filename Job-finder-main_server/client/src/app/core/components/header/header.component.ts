import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Company } from '@core/models/company';
import { User } from '@core/models/user';
import { AdminService } from '@core/services/admin/admin.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  id!: string;
  role!: string;
  isLoggedIn!: boolean;
  loggedInEntity: any;
  logoUrl: any = 'assets/images/user.svg';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService,
    private userService: UserService,
    private adminService: AdminService
  ) {
    this.role = this.storage.getRole();
    this.isLoggedIn = this.storage.getIsLoggedIn();
    if (this.isLoggedIn) {
      if (this.role == 'user') {
        this.id = this.storage.getUserId();
        this.getUser();
      } else if (this.role == 'company') {
        this.id = this.storage.getCompanyId();
        this.getCompany();
      }
    }
  }
  getUser() {
    this.userService
      .getUserProfile(this.id as any)
      .subscribe((user) => (this.loggedInEntity = user));
  }

  getCompany() {
    this.adminService
      .getCompanyById(this.id as any)
      .subscribe((company) => (this.loggedInEntity = company));
    this.adminService.getCompanyLogo(this.id).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.logoUrl = event.target.result;
      };
      reader.readAsDataURL(blob);
    });
  }

  openProfile() {
    const url = this.router.url.split('/');
    if (url[1] === this.role) {
      url.splice(2, 1, this.id);
      this.router.navigate(url).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate([`/${this.role}/${this.id}`]);
    }
  }

  goToCategories() {
    if (this.router.url == '/') {
      document
        .getElementById('categories')
        ?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/']).then(() => {
        document
          .getElementById('categories')
          ?.scrollIntoView({ behavior: 'instant' });
      });
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.storage.removeId();
    this.storage.removeRole();
    this.router.navigate(['/login']);
    window.location.href = '/login';
  }
}

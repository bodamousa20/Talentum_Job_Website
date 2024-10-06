import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: Storage = localStorage;

  // Role
  getRole(): string {
    return this.storage.getItem('role')?.toLowerCase() || '';
  }
  setRole(role: string): void {
    this.storage.setItem('role', role);
  }
  removeRole(): void {
    this.storage.removeItem('role');
  }

  // Id
  getUserId(): string {
    if (this.getRole() === 'user') {
      return this.storage.getItem('id') || '0';
    } else return '0';
  }
  getCompanyId(): string {
    if (this.getRole() === 'company') {
      return this.storage.getItem('id') || '0';
    } else return '0';
  }
  setId(id: string): void {
    this.storage.setItem('id', id);
  }
  removeId(): void {
    this.storage.removeItem('id');
  }

  // Is Logged In
  getIsLoggedIn(): boolean {
    return JSON.parse(this.storage.getItem('isLoggedIn') || 'false');
  }
  setIsLoggedIn(isLoggedIn: boolean): void {
    this.storage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  // Clear Storage
  clearStorage(): void {
    this.storage.clear();
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  private first = 0;
  private rows = 6;
  private totalRecords = 0;

  constructor() {}

  getPaginatedData(data: any[]): any[] {
    const start = this.first;
    const end = this.first + this.rows;
    return data.slice(start, end);
  }

  getTotalRecords(): number {
    return this.totalRecords;
  }

  setFirst(first: number): void {
    this.first = first;
  }

  setRows(rows: number): void {
    this.rows = rows;
  }

  setTotalRecords(totalRecords: number): void {
    this.totalRecords = totalRecords;
  }
}

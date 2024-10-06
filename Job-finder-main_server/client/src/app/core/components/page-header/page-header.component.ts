import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Input() pageTitle!: string;
  @Input() titleFontSize: string = '4.5rem';
  @Input() curlyLineWidth: string = '25rem';
}

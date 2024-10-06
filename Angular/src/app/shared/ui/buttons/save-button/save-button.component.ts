import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  @Input() isChecked!: boolean;
}

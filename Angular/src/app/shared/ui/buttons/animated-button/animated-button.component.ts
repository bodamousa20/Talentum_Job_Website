import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-animated-button',
  templateUrl: './animated-button.component.html',
  styleUrl: './animated-button.component.scss',
})
export class AnimatedButtonComponent {
  @Input() isSelected: boolean = false;
  @Input() width!: string;
  @Input() height!: string;
  @Input() backgroundColor!: string;
  @Input() textColor : string = 'white';
  @Input() icon!: string;
  @Input() label!: string;
  @Input() fontSize!: string;
  @Input() fontWeight!: string;
  @Output() onSelect = new EventEmitter<void>();

  onClick(): void {}
}

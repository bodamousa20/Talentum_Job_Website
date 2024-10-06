import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrl: './price-slider.component.scss',
})
export class PriceSliderComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 10000;
  minInputValue: number = 0;
  maxInputValue: number = 10000;
  minGap: number = 1500;
  sliderMinValue: number = 0;
  sliderMaxValue: number = 10000;

  ngOnInit() {
    this.slideMin();
    this.slideMax();
  }

  slideMin() {
    let gap = this.maxValue - this.minValue;
    if (gap < this.minGap) {
      this.minValue = this.maxValue - this.minGap;
    }
    this.setArea();
  }

  slideMax() {
    let gap = this.maxValue - this.minValue;
    if (gap < this.minGap) {
      this.maxValue = this.minValue + this.minGap;
    }
    this.setArea();
  }

  setArea() {
    const range = document.querySelector('.slider-track') as HTMLElement;
    const minTooltip = document.querySelector('.min-tooltip') as HTMLElement;
    const maxTooltip = document.querySelector('.max-tooltip') as HTMLElement;

    range.style.left = `${
      ((this.minValue - this.sliderMinValue) /
        (this.sliderMaxValue - this.sliderMinValue)) *
      100
    }%`;
    minTooltip.style.left = `${(this.minValue / this.sliderMaxValue) * 100}%`;
    range.style.right = `${
      100 -
      ((this.maxValue - this.sliderMinValue) /
        (this.sliderMaxValue - this.sliderMinValue)) *
        100
    }%`;
    maxTooltip.style.right = `${
      100 - (this.maxValue / this.sliderMaxValue) * 100
    }%`;
  }

  setMinInput() {
    let minPrice = parseInt(this.minInputValue.toString());
    if (minPrice + this.minGap > this.maxValue) {
      this.minInputValue = this.maxValue - this.minGap;
    }
    this.minValue = this.minInputValue;
    this.setArea();
  }

  setMaxInput() {
    let maxPrice = parseInt(this.maxInputValue.toString());
    if (maxPrice - this.minGap < this.minValue) {
      this.maxInputValue = this.minValue + this.minGap;
    }
    this.maxValue = this.maxInputValue;
    this.setArea();
  }
}

import {
  ChangeDetectorRef,
  NgZone,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'timeFormatter',
  pure: false,
})
export class TimeFormatterPipe implements PipeTransform, OnDestroy {
  private timer: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  transform(value: Date): string {
    this.removeTimer();
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;

    this.setTimer();
    return `${Math.floor(seconds)} seconds ago`;
  }

  private setTimer() {
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.ngZone.run(() => this.changeDetectorRef.markForCheck());
      }, 60000); // Update every minute
    });
  }

  private removeTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy() {
    this.removeTimer();
  }
}

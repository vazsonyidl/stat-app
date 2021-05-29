import {Component} from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <mat-progress-bar mode="query"></mat-progress-bar>
  `,
  styleUrls: ['./overlay.style.scss']
})
export class OverlayComponent {
}

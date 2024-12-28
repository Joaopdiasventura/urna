import { Component } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}

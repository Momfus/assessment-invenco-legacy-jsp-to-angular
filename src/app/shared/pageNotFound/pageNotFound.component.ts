import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl font-bold text-gray-100 mb-4">404</h1>
      <p class="text-lg text-white-100 mb-6">Page not found</p>
      <button
        class="btn btn-primary text-white"
        (click)="goToHome()"
      >
        Back to Home
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {

  router = inject(Router);

  goToHome() {
    this.router.navigate(['/']);
  }

}

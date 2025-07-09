import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center h-screen  text-center">
      <h1 class="text-9xl font-extrabold text-gray-100 mb-4">404</h1>
      <p class="text-xl text-gray-300 mb-6">Oops! The page you are looking for does't exist.</p>
      <button
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer"
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

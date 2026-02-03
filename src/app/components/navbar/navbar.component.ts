import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b px-6 md:px-12"
      [ngClass]="(isDarkMode$ | async)
        ? 'bg-black/20 border-white/10 backdrop-blur-xl'
        : 'bg-white/20 border-black/10 backdrop-blur-xl'"
    >
      <div class="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between relative z-20">

        <a href="#home" (click)="scrollTo('home', $event)"
          class="text-2xl font-bold no-underline group flex items-center"> <span [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-black'">OA</span>
          <span class="transition-transform group-hover:scale-150" [ngClass]="(isDarkMode$ | async) ? 'text-pink-500' : 'text-purple-600'">.</span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          <ng-container *ngTemplateOutlet="navLinks"></ng-container>
        </div>

        <div class="flex items-center gap-4">
          <button
            (click)="toggleTheme()"
            class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10"
            [ngClass]="(isDarkMode$ | async) ? 'text-yellow-400' : 'text-slate-700'"
          >
            <svg *ngIf="(isDarkMode$ | async)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg *ngIf="!(isDarkMode$ | async)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <button (click)="isMenuOpen.set(!isMenuOpen())" class="md:hidden p-2" [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-black'">
            <svg *ngIf="!isMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg *ngIf="isMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <div *ngIf="isMenuOpen()"
           class="md:hidden w-full flex flex-col items-center gap-6 pb-8 animate-slide-down"
           [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-black'">
        <ng-container *ngTemplateOutlet="navLinks"></ng-container>
      </div>

      <ng-template #navLinks>
        <a
          *ngFor="let item of navItems"
          [href]="'#' + item.id"
          (click)="scrollTo(item.id, $event); isMenuOpen.set(false)"
          class="nav-link text-sm font-medium transition-all duration-300 relative py-1 no-underline block w-fit"
          [ngClass]="{
            'active': activeSection === item.id,
            'text-white/80 hover:text-white': (isDarkMode$ | async),
            'text-black/70 hover:text-black': !(isDarkMode$ | async)
          }"
        >
          {{ item.label }}
        </a>
      </ng-template>
    </nav>
  `,
  styles: [`
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: currentColor;
      transition: width 0.3s ease;
    }
    .nav-link.active::after { width: 100%; }

    .animate-slide-down {
      animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes slideDown {
      from { opacity: 0; max-height: 0; }
      to { opacity: 1; max-height: 500px; }
    }
  `]
})
export class NavbarComponent {
  @Input() activeSection = 'home';
  private themeService = inject(ThemeService);
  isDarkMode$ = this.themeService.darkMode$;
  isMenuOpen = signal(false);

  navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
}

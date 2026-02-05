import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience"
      class="min-h-screen py-48 relative overflow-hidden transition-colors duration-1000">

      <div class="container mx-auto px-6 relative z-10 flex flex-col items-center">

        <div class="text-center group">
          <h2 class="text-6xl md:text-[9rem] font-[1000] tracking-tighter uppercase italic leading-[0.8] mb-8 transition-all duration-1000"
              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
            EXP<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">ER</span>IENCE
          </h2>
          <div class="h-5 md:h-10"></div>
          <p class="font-mono tracking-[0.5em] uppercase text-[9px] transition-colors duration-700 opacity-40"
             [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
            The Path of <span class="italic font-bold">Evolution</span>
          </p>
        </div>

        <div class="h-10 md:h-20"></div>

        <div class="w-full max-w-4xl relative">

          <div class="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
               [ngClass]="(isDarkMode$ | async) ? 'bg-white/5' : 'bg-slate-200'"></div>

          <div class="space-y-48">
            @for (exp of experience; track exp.title; let i = $index) {
              <div class="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-32 group">

                <div class="md:text-right flex flex-col md:items-end justify-center">
                  <span class="font-mono text-[9px] tracking-[0.3em] text-pink-500 font-black mb-1">{{ exp.period }}</span>
                  <h3 class="text-lg md:text-xl font-bold uppercase tracking-tight transition-all duration-500 group-hover:text-pink-500"
                      [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
                    {{ exp.company }}
                  </h3>
                </div>

                <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
                  <div class="w-1 h-1 rounded-full transition-all duration-500 bg-pink-500 shadow-[0_0_10px_#ec4899] group-hover:scale-[2.5] group-hover:shadow-[0_0_20px_#ec4899]"></div>
                </div>

                <div class="flex flex-col justify-center">
                  <h4 class="text-md md:text-lg font-black italic uppercase mb-2 tracking-wide"
                      [ngClass]="(isDarkMode$ | async) ? 'text-white/90' : 'text-slate-800'">
                    {{ exp.title }}
                  </h4>
                  <p class="text-[10px] md:text-[11px] leading-relaxed max-w-xs opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                     [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-600'">
                    {{ exp.description }}
                  </p>

                  <div class="mt-4 flex flex-wrap gap-3">
                    @for (tag of exp.tags; track tag) {
                      <span class="text-[7px] font-bold uppercase tracking-widest opacity-20 group-hover:opacity-100 group-hover:text-orange-500 transition-all">
                        // {{ tag }}
                      </span>
                    }
                  </div>
                </div>

                <span class="absolute -left-20 top-1/2 -translate-y-1/2 font-mono text-[8px] opacity-5 rotate-90 hidden xl:block uppercase tracking-[1em]"
                      [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
                  Trace_0{{experience.length - i}}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ExperienceComponent {
  private themeService = inject(ThemeService);
  isDarkMode$ = this.themeService.darkMode$;

  experience = [
    {
      title: 'Social Media Manager',
      company: 'GDG Mohammedia',
      period: 'OCT 2025 — PRES',
      description: 'Architecting digital ecosystems for the next generation of engineers. Merging tech with narrative.',
      tags: ['Strategy', 'Design', 'PR']
    },
    {
      title: 'CS Tutor',
      company: 'Mentorship',
      period: 'OCT 2025 — JAN 2026',
      description: 'Simplifying the core of computation. Teaching low-level C optimization and architecture.',
      tags: ['C', 'Time management', 'Arch']
    },
    {
      title: 'Full Stack Dev',
      company: 'SUEZ',
      period: 'JUL — AUG 2025',
      description: 'Building high-performance tools for environmental monitoring. Data-driven web engineering.',
      tags: ['ERP 365','Node.js','Expressjs', 'React', 'PostgreSQL', 'Tailwind', 'Postman']
    }
  ];
}

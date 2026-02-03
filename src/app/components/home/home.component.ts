import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home"
      class="min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-700 bg-transparent"
      [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">

      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style="animation-delay: 3s;"></div>
      </div>

      <div class="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"
           style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 50px 50px;">
      </div>

      <div class="container mx-auto px-8 md:pt-10 relative z-10 flex flex-col items-center">

        <div class="relative mb-8 group">
          <div class="absolute -inset-8 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

          <div class="relative p-2 backdrop-blur-2xl bg-white/5 border border-white/20 rounded-[3.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2">
            <div class="w-44 h-44 md:w-64 md:h-64 rounded-[3rem] overflow-hidden">
              <img src="/assets/profile.jpeg" alt="Omaima Assif"
                class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2">
            </div>

            <div class="absolute -right-2 top-10 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-xl">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              <span class="text-[10px] font-bold uppercase tracking-tighter text-white">Available for Hire</span>
            </div>
          </div>
        </div>

        <div class="text-center relative mb-12">
          <h1 class="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none relative group">
            <span class="block transition-all duration-700 group-hover:tracking-normal group-hover:opacity-20">OMAIMA</span>
            <span class="block -mt-2 md:-mt-6 bg-gradient-to-r from-purple-400 via-pink-600 to-purple-800 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-700">ASSIF</span>
            <span class="absolute inset-0 flex flex-col items-center justify-center text-xl md:text-3xl font-thin opacity-0 group-hover:opacity-100 transition-all duration-700 tracking-[0.2em] md:tracking-[0.5em] pointer-events-none">
              <span>SOFTWARE</span>
              <span>ENGINEER</span>
            </span>
          </h1>

          <p class="mt-8 text-xs md:text-sm lg:text-base font-light tracking-[0.3em] uppercase opacity-70 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between <span class="font-medium text-pink-400">conceptual design</span> and <span class="font-medium text-blue-400">robust engineering</span>.
          </p>
        </div>

        <div class="absolute right-10 bottom-10 hidden lg:flex flex-col items-center gap-6">
          <div class="flex flex-col gap-4">
            <div class="w-px h-20 bg-gradient-to-b from-transparent via-purple-500 to-white/20"></div>
            <p class="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[1em] opacity-30">Scroll to Explore</p>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      ::selection { background: #8b5cf6; color: white; }
    }
  `]
})
export class HomeComponent {
  private themeService = inject(ThemeService);
  isDarkMode$ = this.themeService.darkMode$;

  scrollToProjects() {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  }
}

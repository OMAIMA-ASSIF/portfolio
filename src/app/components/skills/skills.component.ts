import { Component, inject, signal, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="min-h-screen flex items-center py-64 relative overflow-hidden bg-transparent">

      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse opacity-30"
          [ngClass]="(isDarkMode$ | async) ? 'bg-purple-600/20' : 'bg-purple-400/30'"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse opacity-20"
          [style.animation-delay]="'2s'"
          [ngClass]="(isDarkMode$ | async) ? 'bg-pink-600/20' : 'bg-blue-400/30'"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-48 relative">
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[1em] uppercase"
            [ngClass]="(isDarkMode$ | async) ? 'text-purple-500/60' : 'text-purple-600/80'">
            Technical Architecture
          </div>
          <h2 class="text-7xl md:text-9xl font-black mb-4 tracking-tighter transition-all duration-1000"
              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
            TECH <span class="text-outline-glow">ARSENAL</span>
          </h2>
          <div class="flex items-center justify-center gap-6 opacity-60">
            <span class="h-[1px] w-24 bg-gradient-to-r from-transparent to-purple-500"></span>
            <p class="font-mono text-xs uppercase tracking-[0.4em]"
               [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-600'">Initialize Matrix</p>
            <span class="h-[1px] w-24 bg-gradient-to-l from-transparent to-purple-500"></span>
          </div>
        </div>

        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full justify-items-center">
            @for (category of categories; track category.id) {
              <div class="relative group w-full flex justify-center" (mousemove)="handleParallax($event, card)" (mouseleave)="resetParallax(card)">
                <div #card
                     class="relative transition-all duration-500 ease-out transform-gpu w-full"
                     [ngClass]="activeCategory() === category.id ? 'md:col-span-2 max-w-6xl' : 'max-w-[28rem]'">

                  <div
                    (click)="toggleCategory(category.id)"
                    class="relative cursor-pointer rounded-[3.5rem] border backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden transition-all duration-500 w-full"
                    [ngClass]="{
                      'h-80': activeCategory() !== category.id,
                      'h-auto min-h-[32rem]': activeCategory() === category.id,
                      'border-purple-500/60 bg-purple-500/10 shadow-[0_0_40px_rgba(168,85,247,0.2)]': (isDarkMode$ | async) && activeCategory() === category.id,
                      'bg-white/[0.03] border-white/10 hover:border-white/20': (isDarkMode$ | async) && activeCategory() !== category.id,
                      'border-purple-400 bg-white/80 shadow-[0_20px_50px_rgba(168,85,247,0.15)]': !(isDarkMode$ | async) && activeCategory() === category.id,
                      'bg-white/40 border-white/60 shadow-xl shadow-slate-200/20 hover:border-purple-300': !(isDarkMode$ | async) && activeCategory() !== category.id
                    }"
                  >
                    <!-- Glow effect on hover -->
                    @if (activeCategory() !== category.id) {
                      <div class="glow-element absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                           [style.background]="'radial-gradient(circle at ' + mouseX + 'px ' + mouseY + 'px, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'">
                      </div>
                    }

                    <!-- Collapsed state -->
                    @if (activeCategory() !== category.id) {
                      <div class="relative z-10 w-24 h-24 mb-6 transition-all duration-700 group-hover:scale-110"
                           [ngClass]="(isDarkMode$ | async) ? 'text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'text-purple-600 group-hover:drop-shadow-[0_10px_10px_rgba(168,85,247,0.2)]'"
                           [innerHTML]="category.icon"></div>

                      <h3 class="relative z-10 text-3xl font-black tracking-tight uppercase transition-all duration-500 group-hover:tracking-[0.1em]"
                          [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-800'">
                        {{ category.title }}
                      </h3>

                      <div class="absolute top-10 right-12 flex gap-2">
                        <span class="w-2 h-2 rounded-full" [ngClass]="(isDarkMode$ | async) ? 'bg-purple-500/30' : 'bg-purple-400/40'"></span>
                        <span class="w-2 h-2 rounded-full" [ngClass]="(isDarkMode$ | async) ? 'bg-purple-500/30' : 'bg-purple-400/40'"></span>
                      </div>
                    }

                    <!-- Expanded state -->
                    @if (activeCategory() === category.id) {
                      <div class="w-full animate-hyper-reveal">
                        <div class="flex justify-between items-start mb-8 md:mb-12">
                          <div class="space-y-2">
                            <p class="font-mono text-[10px] uppercase tracking-[0.3em]"
                              [ngClass]="(isDarkMode$ | async) ? 'text-purple-300' : 'text-purple-600'">
                              System.Category_{{ category.id }}
                            </p>
                            <h4 class="text-3xl md:text-5xl font-black italic tracking-tighter"
                              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-purple-900'">
                              {{ category.title }}
                            </h4>
                          </div>

                          <button (click)="$event.stopPropagation(); toggleCategory(null)"
                                  class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl border transition-all duration-500 hover:rotate-90 group/close flex-shrink-0"
                                  [ngClass]="(isDarkMode$ | async)
                                    ? 'border-purple-500/30 text-white hover:bg-purple-500'
                                    : 'border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white'">
                            <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>

                        <!-- Skills grid - no scrolling needed -->
                        <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-4">
                          @for (tech of category.skills; track tech; let i = $index) {
                            <div class="group/item relative overflow-hidden flex flex-col items-center justify-center p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 animate-cascade min-h-[130px] md:min-h-[160px]"
                                [style.animation-delay]="i * 40 + 'ms'"
                                [ngClass]="(isDarkMode$ | async)
                                  ? 'bg-purple-900/20 border-purple-500/20 hover:border-purple-400 hover:bg-purple-500/10'
                                  : 'bg-white/60 border-purple-100 shadow-sm hover:border-purple-400 hover:bg-white hover:shadow-lg'">

                              <img [src]="'assets/techs/' + tech.toLowerCase() + '.png'"
                                  [alt]="tech"
                                  (error)="handleImgError($event)"
                                  class="w-12 h-12 md:w-16 md:h-16 object-contain mb-3 md:mb-4 transition-transform duration-500 group-hover/item:scale-110"
                                  [ngClass]="(isDarkMode$ | async) ? 'filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : ''">

                              <span class="block text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-center transition-colors"
                                [ngClass]="(isDarkMode$ | async) ? 'text-purple-100 group-hover/item:text-white' : 'text-purple-800 group-hover/item:text-purple-600'">
                                {{ tech }}
                              </span>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .text-outline-glow {
      color: transparent;
      -webkit-text-stroke: 1px rgba(168, 85, 247, 0.8);
      filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.4));
    }
    @keyframes hyper-reveal {
      0% { opacity: 0; transform: scale(0.98) translateY(20px); filter: blur(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
    }
    .animate-hyper-reveal { animation: hyper-reveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes cascade {
      0% { opacity: 0; transform: translateY(15px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-cascade { animation: cascade 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  `]
})
export class SkillsComponent {
  private themeService = inject(ThemeService);
  private sanitizer = inject(DomSanitizer);
  isDarkMode$ = this.themeService.darkMode$;

  activeCategory = signal<string | null>(null);
  mouseX = 0;
  mouseY = 0;

  categories = [
    {
      id: 'ai',
      title: 'AI & ML',
      icon: this.getIcon(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><circle cx="12" cy="12" r="3"/>`),
      skills: ['Python', 'Flask', 'LangChain', 'ChromaDB', 'Qdrant', 'Neo4j', 'Ollama', 'scikitlearn']
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: this.getIcon(`<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>`),
      skills: ['Angular', 'React', 'JavaScript', 'Streamlit','Tailwind', 'Bootstrap', 'HTML', 'CSS']
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: this.getIcon(`<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`),
      skills: ['NodeJS', 'Spring', 'Express', 'FastAPI', 'PHP', 'Java', 'JavaFX', 'C', 'Linux']
    },
    {
      id: 'data',
      title: 'Data & Cloud',
      icon: this.getIcon(`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>`),
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'aws', 'docker']
    }
  ];

  handleParallax(event: MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (event.clientY - rect.top - centerY) / 12;
    const rotateY = (event.clientX - rect.left - centerX) / -12;
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }

  resetParallax(element: HTMLElement) {
    element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }

  private getIcon(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>
    `);
  }

  toggleCategory(id: string | null) {
    this.activeCategory.set(this.activeCategory() === id ? null : id);
  }

  handleImgError(event: any) {
    event.target.src = 'assets/techs/default.png';
  }
}

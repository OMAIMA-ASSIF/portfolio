import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="min-h-screen flex items-center py-24 relative overflow-hidden bg-transparent">

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-6xl md:text-8xl font-black mb-4 tracking-tighter"
              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-black'">
            TECH <span class="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">ARSENAL</span>
          </h2>
          <p class="font-mono text-xs tracking-[0.4em] uppercase opacity-50">
            [ Select a domain to initialize tech-stack ]
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let category of categories" class="relative group">

            <div
              (click)="toggleCategory(category.id)"
              class="cursor-pointer p-10 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden h-64 flex flex-col items-center justify-center backdrop-blur-md"
              [ngClass]="[
                activeCategory() === category.id ? 'scale-95 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.3)]' : 'border-white/10 hover:border-white/30',
                (isDarkMode$ | async) ? 'bg-white/5' : 'bg-slate-100/50'
              ]"
            >
              <div class="absolute -inset-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>

              <div class="relative z-10 transition-transform duration-500 group-hover:-translate-y-2"
                   [class.scale-110]="activeCategory() === category.id">
                <div class="w-16 h-16 mb-6 mx-auto text-purple-500" [innerHTML]="category.icon"></div>
                <h3 class="text-2xl font-black tracking-tight uppercase" [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-black'">
                  {{ category.title }}
                </h3>
              </div>

              <div class="absolute bottom-6 flex gap-1">
                <div class="w-1 h-1 rounded-full bg-purple-500 transition-all duration-500"
                     [class.w-8]="activeCategory() === category.id"></div>
                <div class="w-1 h-1 rounded-full bg-purple-500/30"></div>
              </div>
            </div>

            <div *ngIf="activeCategory() === category.id"
                 class="fixed inset-0 lg:absolute lg:inset-auto lg:top-0 lg:left-0 lg:w-full lg:h-full z-[100] flex items-center justify-center animate-reveal">

              <div class="w-full h-full p-8 rounded-[2.5rem] border border-purple-500/40 bg-black/90 backdrop-blur-3xl shadow-2xl flex flex-col">
                <div class="flex justify-between items-center mb-6">
                  <span class="text-[10px] font-mono text-purple-400 tracking-widest uppercase">{{ category.title }} Stack</span>
                  <button (click)="$event.stopPropagation(); toggleCategory(category.id)" class="text-white/40 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>

                <div class="grid grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-2">
                  <div *ngFor="let tech of category.skills"
                       class="group/tech relative aspect-square rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">

                    <img [src]="'assets/techs/' + tech.toLowerCase() + '.png'"
                         [alt]="tech"
                         class="w-full h-full object-contain filter grayscale group-hover/tech:grayscale-0 transition-all duration-500 scale-90 group-hover/tech:scale-110">

                    <div class="absolute -bottom-2 opacity-0 group-hover/tech:opacity-100 group-hover/tech:-bottom-8 transition-all duration-300 pointer-events-none z-[110]">
                      <span class="text-[10px] font-bold bg-purple-600 text-white px-2 py-1 rounded-md whitespace-nowrap uppercase tracking-tighter">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes reveal {
      from { opacity: 0; transform: scale(0.8); filter: blur(10px); }
      to { opacity: 1; transform: scale(1); filter: blur(0px); }
    }
    .animate-reveal {
      animation: reveal 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
  `]
})
export class SkillsComponent {
  private themeService = inject(ThemeService);
  private sanitizer = inject(DomSanitizer);
  isDarkMode$ = this.themeService.darkMode$;

  activeCategory = signal<string | null>(null);

  categories = [
    {
      id: 'ai',
      title: 'AI & ML',
      icon: this.getIcon(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><circle cx="12" cy="12" r="3"/>`),
      skills: ['Python', 'Streamlit', 'FastAPI', 'Flask', 'LangChain', 'ChromaDB', 'Qdrant', 'Neo4j', 'Ollama', 'scikitlearn']
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: this.getIcon(`<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>`),
      skills: ['Angular', 'React', 'TypeScript', 'JS', 'Tailwind', 'Bootstrap', 'HTML', 'CSS']
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: this.getIcon(`<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`),
      skills: ['NodeJS', 'Express', 'PHP', 'Java', 'JavaFX', 'C', 'Linux']
    },
    {
      id: 'data',
      title: 'Data & Cloud',
      icon: this.getIcon(`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>`),
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
    }
  ];

  private getIcon(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>
    `);
  }

  toggleCategory(id: string) {
    this.activeCategory.set(this.activeCategory() === id ? null : id);
  }
}

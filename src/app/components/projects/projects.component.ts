import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="min-h-screen flex flex-col items-center py-24 relative overflow-hidden bg-transparent">
      <div class='h-90'></div>

      <div class="container mx-auto px-6 relative z-10">
        <!-- Header -->
        <div class="text-center mb-40 relative group">
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[1em] uppercase opacity-50"
            [ngClass]="(isDarkMode$ | async) ? 'text-purple-400' : 'text-purple-700'">
            Portfolio Archives
          </div>

          <h2 class="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase"
              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
            FEATURED <span class="text-outline-glow animate-glow">PROJECTS</span>
          </h2>

          <div class="flex items-center justify-center gap-6 opacity-40">
            <div class="h-[1px] w-16 bg-gradient-to-r from-transparent to-purple-500"></div>
            <span class="font-mono text-[9px] uppercase tracking-[0.6em]"
                  [ngClass]="(isDarkMode$ | async) ? 'text-purple-200' : 'text-slate-500'">
              Case_Studies_Loaded
            </span>
            <div class="h-[1px] w-16 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>
      <div class='h-10'></div>

        <!-- Projects Grid -->
        <div class="flex justify-center mb-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full">
            @for (project of projects; track project.title; let i = $index) {
              <div class="relative group opacity-0 animate-reveal h-full"
                   [style.animation-delay]="(i * 80) + 'ms'"
                   (mousemove)="handleParallax($event, card)"
                   (mouseleave)="resetParallax(card)">

                <div #card class="relative w-full h-full transition-all duration-500 ease-out transform-gpu cursor-pointer"
                     (click)="openLightbox(i, currentImageIndex[i])">

                  <div class="relative h-full flex flex-col rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-500"
                    [ngClass]="(isDarkMode$ | async)
                      ? 'bg-slate-950/40 border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                      : 'bg-white/40 border-purple-200/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:border-purple-500 hover:bg-white/80 hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)]'">

                    <!-- Image Section -->
                    <div class="relative aspect-video overflow-hidden">
                      @if (!imageLoaded[i]?.[currentImageIndex[i]]) {
                        <div class="absolute inset-0 animate-pulse"
                             [ngClass]="(isDarkMode$ | async) ? 'bg-white/10' : 'bg-slate-100'">
                        </div>
                      }

                      <img [src]="'/assets/projects/' + project.folderName + '/' + project.images[currentImageIndex[i]]"
                           [alt]="project.title"
                           (load)="imageLoaded[i][currentImageIndex[i]] = true"
                           class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

                      <!-- Gradient overlay -->
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <!-- Navigation arrows -->
                      @if (project.images.length > 1) {
                        <div class="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button (click)="prevImage(i, $event)"
                                  class="w-8 h-8 rounded-full backdrop-blur-xl flex items-center justify-center text-white transition-transform hover:scale-110 z-20"
                                  [ngClass]="(isDarkMode$ | async) ? 'bg-white/20' : 'bg-black/30'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                              <path d="M15 18l-6-6 6-6"/>
                            </svg>
                          </button>
                          <button (click)="nextImage(i, $event)"
                                  class="w-8 h-8 rounded-full backdrop-blur-xl flex items-center justify-center text-white transition-transform hover:scale-110 z-20"
                                  [ngClass]="(isDarkMode$ | async) ? 'bg-white/20' : 'bg-black/30'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          </button>
                        </div>

                        <!-- Dots -->
                        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          @for (img of project.images; track img; let idx = $index) {
                            <div class="h-1 rounded-full transition-all"
                                 [ngClass]="currentImageIndex[i] === idx ? 'w-6 bg-white' : 'w-1 bg-white/40'">
                            </div>
                          }
                        </div>
                      }
                    </div>

                    <!-- Content -->
                    <div class="p-6 flex flex-col flex-1">
                      <h3 class="text-lg font-black tracking-tight uppercase italic leading-tight mb-2"
                          [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-800'">
                        {{ project.title }}
                      </h3>

                      <p class="text-xs leading-relaxed mb-4 line-clamp-2 opacity-80"
                         [ngClass]="(isDarkMode$ | async) ? 'text-gray-300' : 'text-slate-600'">
                        {{ project.description }}
                      </p>

                      <!-- Tech badges -->
                      <div class="flex flex-wrap gap-1.5 mt-auto">
                        @for (tech of project.technologies; track tech) {
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md transition-all"
                                [ngClass]="(isDarkMode$ | async)
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-purple-100 text-purple-700 border border-purple-200'">
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      @if (selectedProjectIndex !== null) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fadeIn"
             [ngClass]="(isDarkMode$ | async) ? 'bg-black/95 backdrop-blur-2xl' : 'bg-white/95 backdrop-blur-2xl'"
             (click)="closeLightbox()">

          <button (click)="closeLightbox()"
                  class="absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center transition-all hover:rotate-90 z-50 border"
                  [ngClass]="(isDarkMode$ | async)
                    ? 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                    : 'bg-black/10 text-black hover:bg-black/20 border-black/10'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="relative w-full max-w-6xl" (click)="$event.stopPropagation()">
            <div class="relative flex items-center justify-center mb-8">
              @if (projects[selectedProjectIndex].images.length > 1) {
                <button (click)="prevLightboxImage()"
                        class="absolute left-4 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center transition-all hover:scale-110 z-40 border"
                        [ngClass]="(isDarkMode$ | async)
                          ? 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                          : 'bg-black/10 text-black hover:bg-black/20 border-black/10'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
              }

              <div class="h-[60vh] md:h-[70vh] w-full flex items-center justify-center rounded-2xl overflow-hidden border backdrop-blur-md"
                   [ngClass]="(isDarkMode$ | async) ? 'border-white/10 bg-slate-950/40' : 'border-purple-200/60 bg-white/40'">
                <img [src]="'/assets/projects/' + projects[selectedProjectIndex].folderName + '/' + projects[selectedProjectIndex].images[selectedLightboxImageIndex]"
                     class="max-w-full max-h-full object-contain shadow-2xl"
                     [alt]="projects[selectedProjectIndex].title">
              </div>

              @if (projects[selectedProjectIndex].images.length > 1) {
                <button (click)="nextLightboxImage()"
                        class="absolute right-4 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center transition-all hover:scale-110 z-40 border"
                        [ngClass]="(isDarkMode$ | async)
                          ? 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                          : 'bg-black/10 text-black hover:bg-black/20 border-black/10'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              }
            </div>

            <div class="text-center">
              <h3 class="text-2xl font-black tracking-tight uppercase italic mb-4"
                  [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
                {{ projects[selectedProjectIndex].title }}
              </h3>

              <p class="mb-6 text-sm leading-relaxed max-w-2xl mx-auto opacity-80 text-center"
                 [ngClass]="(isDarkMode$ | async) ? 'text-gray-300' : 'text-slate-600'">
                {{ projects[selectedProjectIndex].description }}
              </p>

              @if (projects[selectedProjectIndex].images.length > 1) {
                <div class="flex justify-center gap-2 overflow-x-auto pb-4">
                  @for (img of projects[selectedProjectIndex].images; track img; let i = $index) {
                    <button (click)="selectedLightboxImageIndex = i"
                            class="relative w-20 h-14 rounded-lg overflow-hidden transition-all flex-shrink-0 border"
                            [ngClass]="selectedLightboxImageIndex === i
                              ? ((isDarkMode$ | async) ? 'ring-2 ring-purple-400 scale-105 border-purple-400' : 'ring-2 ring-purple-600 scale-105 border-purple-600')
                              : ((isDarkMode$ | async) ? 'border-white/10 opacity-50 hover:opacity-100' : 'border-purple-200 opacity-60 hover:opacity-100')">
                      <img [src]="'/assets/projects/' + projects[selectedProjectIndex].folderName + '/' + img"
                           class="w-full h-full object-cover">
                    </button>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }
      <div class='h-90'></div>
    </section>
  `,
  styles: [`
    .text-outline-glow {
      color: transparent;
      -webkit-text-stroke: 1px rgba(168, 85, 247, 0.6);
    }
    @keyframes reveal {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-reveal { animation: reveal 0.6s ease-out forwards; }
    .animate-glow { animation: textGlow 4s infinite alternate; }
    @keyframes textGlow {
      from { filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.2)); }
      to { filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.5)); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
  `]
})
export class ProjectsComponent {
  private themeService = inject(ThemeService);
  isDarkMode$ = this.themeService.darkMode$;
  imageLoaded: boolean[][] = [];
  currentImageIndex: number[] = [];

  selectedProjectIndex: number | null = null;
  selectedLightboxImageIndex: number = 0;

  constructor() {
    this.projects.forEach(() => {
      this.currentImageIndex.push(0);
      this.imageLoaded.push([]);
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeLightbox();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight() {
    if (this.selectedProjectIndex !== null) this.nextLightboxImage();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft() {
    if (this.selectedProjectIndex !== null) this.prevLightboxImage();
  }

  openLightbox(projectIndex: number, imageIndex: number = 0) {
    this.selectedProjectIndex = projectIndex;
    this.selectedLightboxImageIndex = imageIndex;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedProjectIndex = null;
    document.body.style.overflow = '';
  }

  nextImage(projectIndex: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const project = this.projects[projectIndex];
    this.currentImageIndex[projectIndex] = (this.currentImageIndex[projectIndex] + 1) % project.images.length;
  }

  prevImage(projectIndex: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const project = this.projects[projectIndex];
    this.currentImageIndex[projectIndex] = (this.currentImageIndex[projectIndex] - 1 + project.images.length) % project.images.length;
  }

  nextLightboxImage() {
    if (this.selectedProjectIndex === null) return;
    const project = this.projects[this.selectedProjectIndex];
    this.selectedLightboxImageIndex = (this.selectedLightboxImageIndex + 1) % project.images.length;
  }

  prevLightboxImage() {
    if (this.selectedProjectIndex === null) return;
    const project = this.projects[this.selectedProjectIndex];
    this.selectedLightboxImageIndex = (this.selectedLightboxImageIndex - 1 + project.images.length) % project.images.length;
  }

  handleParallax(event: MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const rotateX = (event.clientY - rect.top - rect.height / 2) / 25;
    const rotateY = (event.clientX - rect.left - rect.width / 2) / -25;
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }

  resetParallax(element: HTMLElement) {
    element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }

  projects = [
    {
      title: 'YourData',
      folderName: 'YourData',
      images: ['1.jpg', '2.jpg', '3.jpg'],
      description: 'Interactive web application built to help users explore and visualize CSV datasets. Features intuitive filtering, insightful scatter/bar charts, and automated data preprocessing.',
      technologies: ['Streamlit', 'Pandas']
    },
    {
      title: 'AskAlly',
      folderName: 'AskAlly',
      images: ['1751137865818.jpg'],
      description: 'AI-powered desktop assistant designed to streamline IT support tasks. Integrates local LLMs for intelligent troubleshooting and automated workflows.',
      technologies: ['JavaFX', 'Ollama', 'SQLite', 'LLM']
    },
    {
      title: 'BenevolHub',
      folderName: 'BenevolHub',
      images: ['1.jpg', '2.png', '3.png', '4.jpg'],
      description: 'Centralized volunteer management portal for the "Étoiles Dans Le Ciel" association. Features real-time notifications, social engagement systems, and an admin moderation suite.',
      technologies: ['PHP', 'AJAX', 'MySQL', 'TailwindCSS', 'JavaScript']
    },
    {
      title: 'Client Portal',
      folderName: 'ClientPortal',
      images: ['admin1.PNG', 't1.PNG', 't2.PNG', 't3.PNG', 't5.PNG'],
      description: 'Enterprise bridge for SUEZ Morocco, providing clients autonomous access to Dynamics 365 ERP data. Synchronizes real-time order statuses via a secure middleware API.',
      technologies: ['D365', 'PostgreSQL', 'React.js', 'Node.js', 'Express.js']
    },
    {
      title: 'Hotel Predict AI',
      folderName: 'HotelPredictAI',
      images: ['1.jpg', '2.jpg'],
      description: 'Machine learning application predicting booking cancellations. Helps hotel management optimize occupancy rates through real-time predictive modeling and data visualization.',
      technologies: ['Python', 'Scikit-Learn', 'Flask', 'TailwindCSS']
    },
    {
      title: 'Enerassist',
      folderName: 'Enerassist',
      images: ['1.PNG', '2.PNG', '3.PNG', '4.PNG', '5.PNG', '6.PNG', '7.PNG'],
      description: 'Industrial troubleshooting chatbot using RAG architecture. Provides technical solutions from documentation and automatically generates Jira tickets for unresolved failures.',
      technologies: ['Qdrant', 'RAG', 'Langchain', 'FastAPI', 'Mistral AI', 'React', 'Prompt engineering', 'MCPJira', 'Mongodb']
    }
  ];
}

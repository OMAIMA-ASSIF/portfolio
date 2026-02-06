import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-20 relative overflow-hidden">


      <div class='h-50 md:h-80'></div>
      <div class="w-full relative z-10 flex flex-col items-center px-4">
        <!-- Section Header -->
        <div class="max-w-4xl mx-auto text-center mb-16 flex flex-col items-center w-full">
           <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-[0_0_10px_rgba(168,85,247,0.3)] animate-float">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span class="text-[10px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase">System Active</span>
          </div>

          <h2 class="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white relative text-center">
            <span class="absolute -inset-1 blur-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-20"></span>
            <span class="relative bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              PROJECTS
            </span>
          </h2>

          <p class="text-base leading-relaxed max-w-xl mx-auto text-gray-400 font-light text-center">
            Exploring the digital frontier with <span class="text-purple-400 font-semibold">high-performance</span> code and <span class="text-cyan-400 font-semibold">visionary</span> design.
          </p>
        </div>

        <!-- Projects Flex Grid: Centered & Wrapped -->
        <div class="flex flex-wrap justify-center gap-6 max-w-7xl w-full mx-auto perspective-1000">
          <div *ngFor="let project of projects; let i = index"
               class="group relative w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(50%-1.5rem)] xl:w-[calc(33.33%-1.5rem)] max-w-[450px] rounded-2xl transition-all duration-500 hover:-translate-y-2 mx-auto md:mx-0"
               [style.animation-delay]="i * 100 + 'ms'"
               style="animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; transform: translateY(20px);">

            <!-- Holographic Card Body -->
            <div class="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col">

              <!-- Image Section -->
              <div class="relative h-48 overflow-hidden shrink-0 group/image cursor-zoom-in"
                   (click)="openLightbox(i, currentImageIndex[i])">

                 <!-- Loading Placeholder -->
                <div class="absolute inset-0 bg-gray-900 animate-pulse z-10" *ngIf="!imageLoaded[i][currentImageIndex[i]]"></div>

                <img [src]="'assets/projects/' + project.folderName + '/' + project.images[currentImageIndex[i]]"
                     [alt]="project.title"
                     (load)="imageLoaded[i][currentImageIndex[i]] = true"
                     class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.8] group-hover:brightness-100">

                <!-- Glare Effect -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <!-- Bottom Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent opacity-90"></div>

                <!-- Navigation Controls (Centered) -->
                <ng-container *ngIf="project.images.length > 1">
                  <button (click)="prevImage(i, $event)"
                          class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 hover:bg-purple-600/80 hover:border-purple-500 transition-all duration-300 z-20 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button (click)="nextImage(i, $event)"
                          class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 hover:bg-purple-600/80 hover:border-purple-500 transition-all duration-300 z-20 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>

                  <!-- Modern Indicators -->
                   <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    <div *ngFor="let img of project.images; let imgIdx = index"
                         class="h-1 rounded-full transition-all duration-300 shadow-[0_0_5px_black]"
                         [class]="currentImageIndex[i] === imgIdx ? 'bg-purple-400 w-6' : 'bg-white/30 w-3 hover:bg-white/60'">
                    </div>
                  </div>
                </ng-container>

                <!-- Floating Tech Badge (Centered) -->
                <div class="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                  <div class="px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-purple-500/30 text-[10px] font-bold text-white shadow-lg flex items-center gap-2 group-hover:border-purple-500/80 transition-colors">
                     <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                     <span class="tracking-wider uppercase">{{ project.technologies[0] }}</span>
                  </div>
                </div>
              </div>

              <!-- Content Area (Centered) -->
              <div class="p-6 flex-grow flex flex-col relative z-10 text-center items-center">
                <!-- Title Row -->
                <div class="mb-3 relative w-full flex justify-center items-center">
                  <h3 class="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300 text-center">
                    {{ project.title }}
                  </h3>
                   <a [href]="'#contact'" class="ml-2 inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-45 transition-transform duration-500"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                </div>

                <p class="text-gray-400 leading-relaxed mb-6 line-clamp-3 font-light text-sm max-w-md mx-auto group-hover:text-gray-300 transition-colors text-center">
                  {{ project.description }}
                </p>

                <!-- Full Tech Stack (Centered) -->
                <div class="mt-auto pt-4 border-t border-white/5 w-full group-hover:border-white/10 transition-colors">
                  <div class="flex flex-wrap gap-1.5 justify-center">
                    <span *ngFor="let tech of project.technologies"
                          class="text-[10px] font-bold px-2.5 py-1 rounded-md transition-all duration-300 bg-white/5 text-gray-400 border border-transparent hover:border-purple-500/50 hover:text-white hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 cursor-default">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Glow Behind Card -->
            <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[1.2rem] blur opacity-0 group-hover:opacity-20 transition duration-500 group-hover:duration-200 -z-10"></div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-20 text-center">
            <a href="#contact"
               class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]">
                <span class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span class="relative font-bold text-white tracking-widest text-xs uppercase">Explore Full Portfolio</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative text-purple-400 group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
        </div>
      </div>

      <!-- Enhanced Lightbox (Unchanged Logic, mostly styling) -->
      <div *ngIf="selectedProjectIndex !== null"
           class="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/95 backdrop-blur-2xl animate-fadeIn p-4 md:p-8"
           (click)="closeLightbox()">

        <button (click)="closeLightbox()"
                class="absolute top-8 right-8 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="relative w-full max-w-6xl h-full flex flex-col items-center justify-center" (click)="$event.stopPropagation()">
            <div class="relative flex-grow w-full flex items-center justify-center overflow-hidden rounded-2xl mb-8 group/modal">
                <button *ngIf="projects[selectedProjectIndex].images.length > 1"
                        (click)="prevLightboxImage()"
                        class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-purple-600/80 hover:scale-110 transition-all z-40 outline-none border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                <div class="relative max-w-full max-h-[75vh] p-1 bg-gradient-to-b from-white/10 to-white/5 rounded-xl shadow-2xl">
                    <img [src]="'assets/projects/' + projects[selectedProjectIndex].folderName + '/' + projects[selectedProjectIndex].images[selectedLightboxImageIndex]"
                         class="max-w-full max-h-[74vh] object-contain rounded-lg shadow-2xl select-none"
                         [alt]="projects[selectedProjectIndex].title">
                </div>

                <button *ngIf="projects[selectedProjectIndex].images.length > 1"
                        (click)="nextLightboxImage()"
                        class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-purple-600/80 hover:scale-110 transition-all z-40 outline-none border border-white/10">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>

            <div class="w-full max-w-3xl mx-auto text-center">
                <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">{{ projects[selectedProjectIndex].title }}</h3>
                <div class="flex justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide" *ngIf="projects[selectedProjectIndex].images.length > 1">
                    <button *ngFor="let img of projects[selectedProjectIndex].images; let i = index"
                            (click)="selectedLightboxImageIndex = i"
                            class="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300"
                            [class]="selectedLightboxImageIndex === i ? 'ring-2 ring-purple-500 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10' : 'opacity-40 hover:opacity-100 hover:scale-105'">
                        <img [src]="'assets/projects/' + projects[selectedProjectIndex].folderName + '/' + img"
                             class="w-full h-full object-cover">
                    </button>
                </div>
            </div>
        </div>
      </div>
      <div class='h-50 md:h-80'></div>

    </section>
  `,
  styles: [`
    :host { display: block; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.05); }
    }
    .perspective-1000 {
      perspective: 1000px;
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .animate-pulse-slow {
      animation: pulse-slow 8s ease-in-out infinite;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
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
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeLightbox() {
    this.selectedProjectIndex = null;
    document.body.style.overflow = ''; // Restore scrolling
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

  projects = [
    {
      title: 'YourData',
      folderName: 'YourData',
      images: ['1737502314090.jpg', '1737502113713.jpg', '1737502289218.jpg'],
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
      images: ['1749674043765.jpg', '1749674071072.jpg', '540660835-4d65e413-58d8-4aec-b04c-8e2b3302990c.png', '540660951-6e41678d-863d-46e2-8793-1b624d28f9f4.png'],
      description: 'Centralized volunteer management portal for the "Étoiles Dans Le Ciel" association. Features real-time notifications, social engagement systems, and an admin moderation suite.',
      technologies: ['PHP', 'AJAX', 'MySQL', 'TailwindCSS', 'JavaScript']
    },
    {
      title: 'Client Portal',
      folderName: 'ClientPortal',
      images: ['1757981298598.jpg', '1757981446698.jpg'],
      description: 'Enterprise bridge for SUEZ Morocco, providing clients autonomous access to Dynamics 365 ERP data. Synchronizes real-time order statuses via a secure middleware API.',
      technologies: ['D365', 'PostgreSQL', 'React.js', 'Node.js', 'Express.js']
    },
    {
      title: 'Hotel Predict AI',
      folderName: 'HotelPredictAI',
      images: ['1766521240383.jpg', '1766521224190.jpg'],
      description: 'Machine learning application predicting booking cancellations. Helps hotel management optimize occupancy rates through real-time predictive modeling and data visualization.',
      technologies: ['Python', 'Scikit-Learn', 'Flask', 'TailwindCSS']
    },
    {
      title: 'Enerassist',
      folderName: 'Enerassist',
      images: ['1769866496109.jpg', '1769866313998.jpg', '1769866335434.jpg', '1769866377795.jpg', '1769866545889.jpg', '1769866640996.jpg'],
      description: 'Industrial troubleshooting chatbot using RAG architecture. Provides technical solutions from documentation and automatically generates Jira tickets for unresolved failures.',
      technologies: ['Qdrant', 'RAG', 'Langchain', 'FastAPI', 'Mistral AI']
    }
  ];
}

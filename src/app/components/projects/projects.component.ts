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
            [ngClass]="(isDarkMode$ | async) ? 'text-blue-400' : 'text-blue-700'">
            Work_Archive
          </div>

          <h2 class="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase"
              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
            SELECTED <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">WORKS</span>
          </h2>

          <div class="flex items-center justify-center gap-6 opacity-40">
            <div class="h-[1px] w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <span class="font-mono text-[9px] uppercase tracking-[0.6em]"
                  [ngClass]="(isDarkMode$ | async) ? 'text-blue-200' : 'text-slate-500'">
              Interactive_Explorer_Active
            </span>
            <div class="h-[1px] w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
        </div>
      <div class='h-10'></div>

        <!-- Immersive List (No Categories) -->
        <div class="w-full max-w-7xl mx-auto flex flex-col border-t border-white/10" (mousemove)="updateMousePosition($event)">
          @for (project of projects; track project.title; let i = $index) {
            <div class="group relative py-8 px-6 border-b border-white/10 cursor-pointer overflow-hidden transition-all duration-500"
                 (mouseenter)="hoveredIndex = i"
                 (mouseleave)="hoveredIndex = null"
                 (click)="openLightbox(i)">
              
              <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                <div class="flex items-center gap-16">
                  <span class="font-mono text-xs opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-300">0{{ i + 1 }}</span>
                  <h3 class="text-4xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-8"
                      [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
                    {{ project.title }}
                  </h3>
                </div>

                <div class="flex flex-col md:items-end gap-6 max-w-lg transition-all duration-500 opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-4 group-hover:translate-y-0">
                  <p class="text-[13px] md:text-right font-medium leading-relaxed"
                     [ngClass]="(isDarkMode$ | async) ? 'text-slate-400' : 'text-slate-600'">
                    {{ project.description }}
                  </p>
                  <div class="flex flex-wrap md:justify-end gap-3">
                    @for (tech of project.technologies; track tech) {
                      <span class="text-[9px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 border border-white/10 rounded-sm bg-white/5 group-hover:border-blue-500/30">
                        {{ tech }}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <!-- Floating Preview (Sharper corners, better fit) -->
              <div class="fixed pointer-events-none z-[100] w-[600px] h-[300px] rounded-lg overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-950 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 hidden lg:block"
                   [style.left.px]="mouseX + 40"
                   [style.top.px]="mouseY - 150">
                <img [src]="'assets/projects/' + project.folderName + '/' + project.images[0]" class="w-full h-full object-contain">
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Detail Modal (Sharper corners, gallery view) -->
      @if (selectedProjectIndex !== null) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn"
             (click)="closeLightbox()">
          <div class="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"></div>
          
          <div class="relative w-full max-w-[90vw] h-[90vh] bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row"
               (click)="$event.stopPropagation()">
            
            <!-- Left Side: Full Gallery -->
            <div class="w-full md:w-2/3 h-full bg-black overflow-y-auto p-12 custom-scrollbar">
              <div class="flex flex-col gap-8">
                @for (img of projects[selectedProjectIndex].images; track img) {
                  <div class="relative w-full border border-white/5 rounded-lg overflow-hidden group/img">
                    <img [src]="'assets/projects/' + projects[selectedProjectIndex].folderName + '/' + img"
                         class="w-full object-contain bg-slate-900">
                    <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                }
              </div>
            </div>

            <!-- Right Side: Info Panel (Sharper) -->
            <div class="w-full md:w-1/3 p-12 md:p-16 flex flex-col h-full bg-slate-900 border-l border-white/10">
              <div class="flex justify-between items-start mb-16">
                <span class="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Project_Specs</span>
                <button (click)="closeLightbox()" class="text-white/20 hover:text-white transition-all hover:rotate-90">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
                </button>
              </div>

              <h3 class="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-10 leading-tight">
                {{ projects[selectedProjectIndex].title }}
              </h3>

              <p class="text-slate-400 text-sm leading-relaxed mb-12 font-medium">
                {{ projects[selectedProjectIndex].description }}
              </p>

              <div class="space-y-8 mb-16">
                <h4 class="text-white font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">Stack_Report</h4>
                <div class="flex flex-wrap gap-2">
                  @for (tech of projects[selectedProjectIndex].technologies; track tech) {
                    <span class="px-5 py-2 rounded-md bg-white/5 border border-white/10 text-white text-[11px] font-mono tracking-wider">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div class='h-90'></div>
    </section>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 2px; }
    
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 5s ease infinite;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(1.02); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  `]
})
export class ProjectsComponent {
  private themeService = inject(ThemeService);
  isDarkMode$ = this.themeService.darkMode$;

  selectedProjectIndex: number | null = null;
  hoveredIndex: number | null = null;

  mouseX = 0;
  mouseY = 0;

  @HostListener('document:mousemove', ['$event'])
  updateMousePosition(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeLightbox();
  }

  openLightbox(projectIndex: number) {
    this.selectedProjectIndex = projectIndex;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedProjectIndex = null;
    document.body.style.overflow = '';
  }

  projects = [
    {
      title: 'KritW9rit',
      folderName: 'KritW9rit',
      images: [
        '1.png', '2.PNG', '3.PNG', '4.PNG', '5.PNG', '6.PNG', '7.PNG', '8.PNG', '10.PNG', '11.PNG',
        'admin/1.PNG', 'admin/2.PNG', 'admin/3.PNG', 'admin/4.PNG', 'admin/5.PNG', 'admin/6.PNG', 'admin/7.PNG', 'admin/8.PNG',
        'owner/1.PNG', 'owner/2.PNG', 'owner/3.PNG', 'owner/4.PNG', 'owner/5.PNG',
        'student/1.PNG', 'student/3.PNG', 'student/5.PNG', 'student/6.PNG', 'student/7.PNG', 'student/8.PNG', 'student/9.PNG', 'student/10.PNG',
        'student/12.PNG', 'student/13.PNG', 'student/14.PNG', 'student/15.PNG', 'student/16.PNG', 'student/17.PNG', 'student/18.PNG', 'student/19.PNG',
        'student/20.PNG', 'student/21.PNG', 'student/22.PNG', 'student/23.PNG', 'student/24.PNG', 'student/25.PNG', 'student/26.PNG', 'student/27.PNG',
        'student/28.PNG', 'student/30.PNG', 'student/31.PNG', 'student/32.PNG', 'student/33.PNG', 'student/34.PNG', 'student/35.PNG', 'student/36.PNG'
      ],
      description: 'End-to-end development of a comprehensive Moroccan student platform, built from scratch. Architected the entire system, selected the technical stack, and implemented core features including instant messaging, security, and scaling infrastructure.',
      technologies: ['Node.js', 'Express', 'Angular', 'MongoDB', 'JWT', 'Socket.io']
    },
    {
      title: 'Enerassist',
      folderName: 'Enerassist',
      images: ['1.PNG', '2.PNG', '3.PNG', '4.PNG', '5.PNG', '6.PNG', '7.PNG'],
      description: 'Industrial troubleshooting chatbot using RAG architecture. Provides technical solutions from documentation and automatically generates Jira tickets.',
      technologies: ['Qdrant', 'RAG', 'Langchain', 'FastAPI', 'Mistral AI', 'React', 'MCP Server', 'MongoDB', 'Expressjs']
    },
    {
      title: 'YourData',
      folderName: 'YourData',
      images: ['1.jpg', '2.jpg', '3.jpg'],
      description: 'Interactive web application for CSV dataset visualization. Features intuitive filtering, insightful charts, and automated data preprocessing.',
      technologies: ['Streamlit', 'Pandas']
    },
    {
      title: 'AskAlly',
      folderName: 'AskAlly',
      images: ['1751137865818.jpg'],
      description: 'AI-powered desktop assistant for IT support tasks. Integrates local LLMs for intelligent troubleshooting and automated workflows.',
      technologies: ['JavaFX', 'Ollama', 'SQLite', 'LLM']
    },
    {
      title: 'BenevolHub',
      folderName: 'BenevolHub',
      images: ['1.jpg', '2.png', '3.png', '4.jpg'],
      description: 'Centralized volunteer management portal. Features real-time notifications, social engagement systems, and an admin moderation suite.',
      technologies: ['PHP', 'Javascript', 'AJAX', 'MySQL', 'TailwindCSS']
    },
    {
      title: 'Client Portal',
      folderName: 'ClientPortal',
      images: ['admin1.PNG', 't1.PNG', 't2.PNG', 't3.PNG', 't5.PNG'],
      description: 'Enterprise bridge for SUEZ Morocco, providing clients autonomous access to Dynamics 365 ERP data via secure middleware API.',
      technologies: ['D365', 'PostgreSQL', 'React.js', 'Node.js', 'OData', 'TailwindCSS']
    },
    {
      title: 'Hotel Predict AI',
      folderName: 'HotelPredictAI',
      images: ['1.jpg', '2.jpg'],
      description: 'Machine learning application predicting booking cancellations to help hotel management optimize occupancy rates.',
      technologies: ['Python', 'Scikit-Learn', 'Flask', 'Machine Learning']
    }
  ];
}

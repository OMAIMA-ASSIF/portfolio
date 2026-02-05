import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="certifications" class="min-h-screen flex flex-col items-center py-24 relative overflow-hidden bg-transparent">

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-40 relative group ">
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[1em] uppercase opacity-50"
            [ngClass]="(isDarkMode$ | async) ? 'text-purple-400' : 'text-purple-700'">
            Neural Link Established
          </div>

          <h2 class="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase"
              [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">
            ACHIEVEMENT <span class="text-outline-glow animate-glow">VAULT</span>
          </h2>

          <div class="flex items-center justify-center gap-6 opacity-40">
            <div class="h-[1px] w-16 bg-gradient-to-r from-transparent to-purple-500"></div>
            <span class="font-mono text-[9px] uppercase tracking-[0.6em]"
                  [ngClass]="(isDarkMode$ | async) ? 'text-purple-200' : 'text-slate-500'">
              Displaying_Encrypted_Credentials
            </span>
            <div class="h-[1px] w-16 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

        </div>
        <div class="h-13"></div>

        <div class="flex justify-center mb-16 transition-all duration-700 ease-in-out">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
            @for (cert of visibleCertifications(); track cert.filename; let i = $index) {
              <div class="relative group opacity-0 animate-reveal"
                   [style.animation-delay]="(i * 50) + 'ms'"
                   (mousemove)="handleParallax($event, card)"
                   (mouseleave)="resetParallax(card)">

                <div #card class="relative h-64 w-full min-w-[260px] transition-all duration-500 ease-out transform-gpu">
                  <div class="relative h-full rounded-[2rem] border backdrop-blur-md flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-500"
                    [ngClass]="(isDarkMode$ | async)
                      ? 'bg-slate-950/40 border-white/10 hover:border-purple-500/50'
                      : 'bg-white/70 border-white shadow-xl shadow-slate-200/50 hover:border-purple-400'">

                    <div class="relative z-10 w-full h-32 flex items-center justify-center">
                       <div class="absolute w-16 h-16 bg-purple-500/10 rounded-full blur-2xl"></div>
                       <img [src]="'assets/certifs/' + cert.filename"
                            [alt]="cert.title"
                            (error)="handleImgError($event)"
                            class="max-w-[80%] max-h-[80%] object-contain relative z-10 transition-all duration-700 group-hover:scale-110">
                    </div>

                    <div class="text-center mt-4 w-full px-2">
                      <h3 class="text-sm font-black tracking-tight uppercase italic leading-tight mb-1"
                          [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-800'">
                        {{ cert.title }}
                      </h3>
                      <p class="text-[9px] font-mono font-bold uppercase tracking-[0.2em] opacity-60"
                         [ngClass]="(isDarkMode$ | async) ? 'text-purple-400' : 'text-purple-600'">
                        {{ cert.issuer }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div class="h-4 md:h-8 "></div>

        <div class="flex justify-center">
          <button (click)="toggleExpand()"
            class="group relative px-10 py-4 font-mono text-[10px] uppercase tracking-[0.4em] overflow-hidden transition-all duration-300 active:scale-95"
            [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">

            <span class="relative z-10 ">
              {{ isExpanded() ? 'See less' : 'Access Full Records' }}
            </span>

            <div class="absolute inset-0 border border-purple-500/30 group-hover:border-purple-500 transition-colors"></div>
            <div class="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 transition-transform duration-500"
                 [ngClass]="isExpanded() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"></div>

            <div class="absolute -inset-1 bg-purple-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
        <div class="h-50 md:h-65 "></div>
      </div>
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
  `]
})
export class CertificationsComponent {
  private themeService = inject(ThemeService);
  isDarkMode$ = this.themeService.darkMode$;

  // Logic for Expand/Collapse
  isExpanded = signal(false);

  certifications = [
    { title: 'Associate AI Engineer', issuer: 'DataCamp', filename: 'aieng.jpg' },
    { title: 'Associate AI Foundations', issuer: 'Oracle', filename: 'aifoundations.jpg' },
    { title: 'Generative AI Professional', issuer: 'Oracle', filename: 'generativeai.jpg' },
    { title: 'AWS Cloud Practitioner', issuer: 'DataCamp', filename: 'aws.PNG' },
    { title: 'C, C++, PHP Bootcamp', issuer: 'Udemy', filename: 'bootcampudemy.jpg' },
    { title: 'CCNA : Introduction', issuer: 'CISCO', filename: 'ccna.jpg' },
    { title: 'SQL Intermediate', issuer: 'SoloLearn', filename: 'sql.jpg' },
    { title: 'Python 2', issuer: 'CISCO', filename: 'python2.jpg' },
    { title: 'OOP in Javascript', issuer: 'Coddy', filename: 'oopjs.jpg' },
    { title: 'Modern AI', issuer: 'CISCO', filename: 'modernai.jpg' },
    { title: 'Fundamentals of LLMs', issuer: 'Hugging Face', filename: 'llmhugg.jpg' },
    { title: 'Data Analysis with Python', issuer: 'FreeCodeCamp', filename: 'dataAnalysis.jpg' },
    { title: 'Linux Essentials', issuer: 'CISCO', filename: 'linuxEss.jpg' },
    { title: 'NDG Linux Unhatched', issuer: 'CISCO', filename: 'linuxUnh.jpg' },
    { title: 'Productivity Efficiency', issuer: 'Eduta', filename: 'softskills.jpg' },
    { title: 'Productivity Masterclass', issuer: 'Eduta', filename: 'soft2.jpg' },
    { title: 'English 2 for IT', issuer: 'CISCO', filename: 'english.jpg' },
  ];

  visibleCertifications = computed(() => {
    return this.isExpanded() ? this.certifications : this.certifications.slice(0, 4);
  });

  toggleExpand() {
    this.isExpanded.update(v => !v);

    // Optional: Smooth scroll back to section top when closing
    if (this.isExpanded()) {
        setTimeout(() => {
            document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
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

  handleImgError(event: any) {
    event.target.src = 'assets/certifs/placeholder.png';
  }
}

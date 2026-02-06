import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact"
      class="min-h-screen w-full py-20 relative overflow-hidden transition-colors duration-1000 flex flex-col items-center justify-center"
      [ngClass]="(isDarkMode$ | async) ? 'text-white' : 'text-slate-900'">

      <div class='h-30'></div>

      <div class="w-full max-w-6xl px-6 flex flex-col items-center justify-center relative z-10">

        <div class="w-full text-center mb-16 space-y-6">
          <div class="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-current/[0.03] backdrop-blur-2xl animate-in fade-in zoom-in duration-1000">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,1)]"></span>
            </span>
            <span class="font-mono text-[10px] tracking-[0.4em] uppercase opacity-60">{{ statusMessage }}</span>
          </div>

          <h2 class="text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase italic">
            Let's <span class="text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 via-pink-500 to-orange-400">Connect.</span>
          </h2>
        </div>
        <div class='h-10'></div>

        <div class="w-full max-w-3xl backdrop-blur-[100px] bg-white/[0.01] dark:bg-black/[0.1] rounded-[4rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden min-h-[550px] flex flex-col justify-center">

          <div class="absolute top-0 left-0 w-full h-1 bg-current/[0.02]">
            <div class="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 transition-all duration-1000 ease-in-out"
                 [style.width.%]="(currentStep / 4) * 100"></div>
          </div>

          <ng-container [ngSwitch]="currentStep">

            <div *ngSwitchCase="1" class="w-full space-y-14 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div class="text-center space-y-4">
                <p class="text-purple-500 font-mono text-[10px] tracking-[0.6em] uppercase">01 / Identity</p>
                <h3 class="text-5xl md:text-6xl font-bold tracking-tight">Who are you?</h3>
              </div>

              <input [(ngModel)]="formData.name" (keyup.enter)="formData.name && nextStep()"
                placeholder="Name or Company"
                class="w-full bg-transparent border-b-2 border-current/5 outline-none text-4xl md:text-6xl py-6 focus:border-purple-500/50 transition-all text-center placeholder:opacity-5 font-light" />

                <div class='h-8'></div>
              <div class="flex justify-center">
                <button (click)="nextStep()" [disabled]="!formData.name"
                  class="group relative px-20 py-6 rounded-full bg-white text-black dark:bg-white dark:text-black font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-10 shadow-xl shadow-white/10">
                  <span class="relative z-10">Continue</span>
                </button>
              </div>

            </div>

            <div *ngSwitchCase="2" class="w-full space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
              <div class="text-center space-y-4">
                <p class="text-pink-500 font-mono text-[10px] tracking-[0.6em] uppercase">02 / Intent</p>
                <h3 class="text-5xl md:text-6xl font-bold tracking-tight">Seeking help with?</h3>
              </div>
              <div class='h-10'></div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button *ngFor="let type of ['Web Design', 'Frontend','Backend','RAG', 'Consultation']"
                  (click)="formData.projectType = type; nextStep()"
                  class="p-10 rounded-[2.5rem] bg-current/[0.03] hover:bg-current/[0.07] transition-all text-xl font-bold italic text-center">
                  {{ type }}
                </button>
              </div>
              <button (click)="currentStep = 1" class="mx-auto block opacity-30 hover:opacity-100 text-[10px] tracking-[0.3em] uppercase transition-opacity italic">Return</button>
            </div>

            <div *ngSwitchCase="3" class="w-full space-y-14 animate-in fade-in slide-in-from-right-8 duration-700">
              <div class="text-center space-y-4">
                <p class="text-orange-500 font-mono text-[10px] tracking-[0.6em] uppercase">03 / Outreach</p>
                <h3 class="text-5xl md:text-6xl font-bold tracking-tight">Where to reply?</h3>
              </div>
              <input [(ngModel)]="formData.email" type="email" (keyup.enter)="isValidEmail() && submitForm()"
                placeholder="your@email.com"
                class="w-full bg-transparent border-b-2 border-current/5 outline-none text-4xl md:text-6xl py-6 focus:border-orange-500/50 transition-all text-center placeholder:opacity-5 font-light" />
              <div class="flex flex-col items-center gap-8">
                <div class='h-10'></div>
                <button (click)="submitForm()" [disabled]="!isValidEmail() || isSending"
                  class="px-20 py-6 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-105 shadow-2xl shadow-purple-500/20 disabled:opacity-10">
                  {{ isSending ? 'Transmitting...' : 'Send Inquiry' }}
                </button>
                <button (click)="currentStep = 2" class="opacity-30 hover:opacity-100 text-[10px] tracking-[0.3em] uppercase italic transition-opacity">Back</button>
              </div>
            </div>

            <div *ngSwitchCase="4" class="w-full flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in-95 duration-700">
              <div class="w-32 h-32 bg-green-500/5 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="space-y-4">
                <h3 class="text-7xl font-black italic tracking-tighter uppercase leading-none">Sent.</h3>
                <p class="text-xl opacity-40 font-light max-w-sm mx-auto">Talk soon, <span class="text-current opacity-100 font-bold italic">{{ formData.name }}</span>. I'll review your request shortly.</p>
              </div>
            </div>

          </ng-container>
        </div>
        <div class='h-10'></div>
        <div class="mt-20 flex justify-center gap-12">
          <a *ngFor="let link of socialLinks"
            [href]="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative">
            <div class="p-2 rounded-full transition-transform group-hover:-translate-y-2 duration-500">
              <span [innerHTML]="link.icon" class="w-7 h-7 opacity-20 group-hover:opacity-100 group-hover:text-purple-500 transition-all duration-500"></span>
            </div>
            <span class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase tracking-[0.5em] opacity-0 group-hover:opacity-40 transition-opacity whitespace-nowrap">
              {{ link.label }}
            </span>
          </a>
        </div>

      </div>
      <div class='h-30'></div>
    </section>
  `,
  styles: [`
    :host { width: 100%; display: block; }
    input::placeholder { text-align: center; }
    input:-webkit-autofill { -webkit-text-fill-color: currentColor !important; transition: background-color 5000s ease-in-out 0s; }
    button:disabled { cursor: not-allowed; }
  `]
})
export class ContactComponent {
  private themeService = inject(ThemeService);
  private sanitizer = inject(DomSanitizer);

  isDarkMode$ = this.themeService.darkMode$;
  currentStep = 1;
  isSending = false;
  statusMessage = 'Available for new projects';
  formData = { name: '', projectType: '', email: '' };

  socialLinks: any[] = [];

  constructor() {
    this.socialLinks = [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/omaima-assif-093549295/',
        icon: this.getIcon(`<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>`)
      },
      {
        label: 'GitHub',
        url: 'https://github.com/OMAIMA-ASSIF',
        icon: this.getIcon(`<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>`)
      },
      {
        label: 'Gmail',
        url: 'mailto:omaima.assif-etu@etu.univh2c.ma',
        icon: this.getIcon(`<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`)
      }
    ];
  }

  nextStep() { if (this.currentStep < 3) this.currentStep++; }
  isValidEmail() { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email); }

  async submitForm() {
    this.isSending = true;
    this.statusMessage = 'Transmitting...';
    const templateParams = {
      name: this.formData.name,
      email: this.formData.email,
      message: `Project Type: ${this.formData.projectType}`
    };
    try {
      await emailjs.send('service_d0xgjpc', 'template_k327507', templateParams, '7PVzR3fS9wi848y4X');
      this.currentStep = 4;
      this.isSending = false;
      this.statusMessage = 'Message received';
    } catch (error) {
      this.isSending = false;
      this.statusMessage = 'Transmission failed';
    }
  }

  private getIcon(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">${path}</svg>
    `);
  }
}

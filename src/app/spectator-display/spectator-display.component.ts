import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-spectator-display',
  templateUrl: './spectator-display.component.html',
  styleUrls: ['./spectator-display.component.css'],
  animations: [
    trigger('timerPulse', [
      state('normal', style({ transform: 'scale(1)', opacity: 1 })),
      state('warning', style({ transform: 'scale(1.05)', opacity: 1 })),
      state('critical', style({ transform: 'scale(1.1)', opacity: 1 })),
      transition('* => warning', [
        animate('0.3s ease-in-out')
      ]),
      transition('* => critical', [
        animate('0.2s ease-in-out', keyframes([
          style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(1.15)', opacity: 0.8, offset: 0.5 }),
          style({ transform: 'scale(1.1)', opacity: 1, offset: 1 })
        ]))
      ])
    ]),
    trigger('athleteSlide', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('buttonPress', [
      transition('* => pressed', [
        animate('0.1s ease-in', style({ transform: 'scale(0.95)' })),
        animate('0.1s ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class SpectatorDisplayComponent implements OnInit, OnDestroy {
  // Timer properties
  timeLeft: number = 60;
  totalTime: number = 60;
  timerRunning: boolean = false;
  private timerSubscription?: Subscription;

  // Athletes data
  athletes: string[] = [];
  currentAthleteIndex: number = 0;
  currentAthleteName: string = '';
  fileLoaded: boolean = false;

  // Animation states
  timerState: string = 'normal';
  buttonStates: { [key: string]: string } = {};
  
  // Math helper for template
  Math = Math;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAthletesFromFile();
  }

  // Raccourcis clavier
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.fileLoaded) return;

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.startTimer();
        break;
      case 'KeyR':
        event.preventDefault();
        this.resetTimer();
        break;
      case 'ArrowRight':
      case 'KeyN':
        event.preventDefault();
        this.nextAthlete();
        break;
      case 'Escape':
        event.preventDefault();
        this.stopTimer();
        break;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // Load athletes from assets file
  private loadAthletesFromFile(): void {
    this.http.get('assets/athletes.txt', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.athletes = data.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
          
          if (this.athletes.length > 0) {
            this.currentAthleteIndex = 0;
            this.currentAthleteName = this.athletes[0];
            this.fileLoaded = true;
            this.resetTimer();
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement du fichier athletes.txt:', error);
          // Fallback avec des athlètes par défaut
          this.athletes = [
            'Athlète 1', 'Athlète 2', 'Athlète 3', 'Athlète 4', 'Athlète 5'
          ];
          this.currentAthleteIndex = 0;
          this.currentAthleteName = this.athletes[0];
          this.fileLoaded = true;
          this.resetTimer();
        }
      });
  }

  // Timer controls with animation
  startTimer(): void {
    if (!this.timerRunning && this.timeLeft > 0) {
      this.animateButton('start');
      this.timerRunning = true;
      this.timerSubscription = interval(1000).subscribe(() => {
        this.timeLeft--;
        this.updateTimerState();
        if (this.timeLeft <= 0) {
          this.stopTimer();
        }
      });
    }
  }

  stopTimer(): void {
    this.timerRunning = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
    this.updateTimerState();
  }

  resetTimer(): void {
    this.animateButton('reset');
    this.stopTimer();
    this.timeLeft = this.totalTime;
    this.updateTimerState();
  }

  // Navigation with animation
  nextAthlete(): void {
    if (!this.fileLoaded || this.athletes.length === 0) return;
    
    this.animateButton('next');
    this.stopTimer();
    this.currentAthleteIndex = (this.currentAthleteIndex + 1) % this.athletes.length;
    this.currentAthleteName = this.athletes[this.currentAthleteIndex];
    this.resetTimer();
  }

  // Animation helpers
  private updateTimerState(): void {
    if (this.timeLeft <= 10) {
      this.timerState = 'critical';
    } else if (this.timeLeft <= 30) {
      this.timerState = 'warning';
    } else {
      this.timerState = 'normal';
    }
  }

  private animateButton(buttonName: string): void {
    this.buttonStates[buttonName] = 'pressed';
    setTimeout(() => {
      this.buttonStates[buttonName] = 'normal';
    }, 200);
  }

  // Getters for display
  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  get timerColor(): string {
    if (this.timeLeft <= 10) return 'text-red-400';
    if (this.timeLeft <= 30) return 'text-yellow-400';
    return 'text-green-400';
  }

  get timerProgress(): number {
    return ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
  }

  get displayAthleteName(): string {
    return this.currentAthleteName || 'Aucun athlète';
  }

  get timerGlow(): string {
    if (this.timeLeft <= 10) return 'drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]';
    if (this.timeLeft <= 30) return 'drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]';
    return 'drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]';
  }
}

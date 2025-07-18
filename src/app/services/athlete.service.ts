import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Athlete {
  id: number;
  name: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private athletesSubject = new BehaviorSubject<Athlete[]>([]);
  public athletes$ = this.athletesSubject.asObservable();

  private currentAthleteSubject = new BehaviorSubject<Athlete | null>(null);
  public currentAthlete$ = this.currentAthleteSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadAthletes(): Observable<Athlete[]> {
    return this.http.get('assets/athletes.txt', { responseType: 'text' })
      .pipe(
        map(data => {
          const names = data.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
          
          const athletes: Athlete[] = names.map((name, index) => ({
            id: index + 1,
            name: name,
            isActive: index === 0
          }));

          this.athletesSubject.next(athletes);
          if (athletes.length > 0) {
            this.currentAthleteSubject.next(athletes[0]);
          }
          
          return athletes;
        })
      );
  }

  setCurrentAthlete(athlete: Athlete): void {
    // Marquer tous les athlètes comme inactifs
    const athletes = this.athletesSubject.value.map(a => ({
      ...a,
      isActive: a.id === athlete.id
    }));
    
    this.athletesSubject.next(athletes);
    this.currentAthleteSubject.next(athlete);
  }

  getNextAthlete(): Athlete | null {
    const athletes = this.athletesSubject.value;
    const currentAthlete = this.currentAthleteSubject.value;
    
    if (!currentAthlete || athletes.length === 0) return null;
    
    const currentIndex = athletes.findIndex(a => a.id === currentAthlete.id);
    const nextIndex = (currentIndex + 1) % athletes.length;
    
    return athletes[nextIndex];
  }

  getTotalCount(): number {
    return this.athletesSubject.value.length;
  }

  getCurrentIndex(): number {
    const athletes = this.athletesSubject.value;
    const currentAthlete = this.currentAthleteSubject.value;
    
    if (!currentAthlete) return 0;
    
    return athletes.findIndex(a => a.id === currentAthlete.id);
  }
}

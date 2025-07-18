import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectatorDisplayComponent } from './spectator-display.component';

describe('SpectatorDisplayComponent', () => {
  let component: SpectatorDisplayComponent;
  let fixture: ComponentFixture<SpectatorDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpectatorDisplayComponent]
    });
    fixture = TestBed.createComponent(SpectatorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

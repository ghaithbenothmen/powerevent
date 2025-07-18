import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule, Play, RotateCcw, SkipForward } from 'lucide-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpectatorDisplayComponent } from './spectator-display/spectator-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SpectatorDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LucideAngularModule.pick({ Play, RotateCcw, SkipForward })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

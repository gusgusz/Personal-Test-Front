import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ContainerComponent } from './components/container/container.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BottomComponent } from './components/bottom/bottom.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BottomComponent
  ],
  imports: [
    TopBarComponent,
    ContainerComponent,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    SideBarComponent,
    MatButtonModule,
    NgIf,
    MatSidenavModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

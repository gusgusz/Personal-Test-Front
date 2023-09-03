import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { UsersComponent } from './components/users/users.component';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importe MatProgressSpinnerModule

import { Component } from '@angular/core';

import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectionList } from '@angular/material/list';
import { LoadingComponent } from './components/loading/loading.component';
import { PostsComponent } from './components/posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
    BottomComponent,
    UsersComponent,
    ContainerComponent,
    LoadingComponent,
    PostsComponent,
  ],
  imports: [
    HttpClientModule,
    MatPaginatorModule,
    TopBarComponent,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SideBarComponent,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatNativeDateModule,
    NgIf,
    MatSidenavModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

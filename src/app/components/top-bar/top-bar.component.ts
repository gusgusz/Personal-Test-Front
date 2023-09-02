import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],

  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class TopBarComponent {
  constructor(private drawerService: DrawerService) {}

  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

}


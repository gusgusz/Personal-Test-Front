import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DrawerService } from '../drawer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  standalone: true,
  imports: [MatSidenavModule, NgIf, MatButtonModule, CommonModule, FormsModule],
})
export class ContainerComponent {

  constructor(private drawerService: DrawerService) {}
  
  drawerOpen$ = this.drawerService.drawerOpen$;
  showFiller = false;
 
  
}

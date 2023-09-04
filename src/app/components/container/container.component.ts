import { DrawerService } from '../drawer.service';
import { Component } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent {

  constructor(private drawerService: DrawerService, loadingService: LoadingService) {}
  
  drawerOpen$ = this.drawerService.drawerOpen$;
  showFiller = false;

  typesOfPages: string[] = ['Posts', 'Users'];
  selectedItem: string | null = null;
  selectedPage: string | null = 'Posts';

  onSelectionChange(page: string) {
    this.selectedPage = page;
  }




  
}

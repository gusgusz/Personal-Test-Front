import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { DrawerService } from '../drawer.service';
import { LoadingService } from '../loading/loading.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {

  users: any[] = []; 

  constructor(
    private usersService: UsersService,
    private drawerService: DrawerService,
    private loadingService: LoadingService
  ) {}

  loading$!: Observable<boolean>;


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    if (this.users.length === 0) {
      this.loading$ = this.loadingService.loading$; 
      this.loadingService.show(); 
    }
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.loadingService.hide(); 
    });
  }


toggleEditMode(user: any) {
  user.isEditing = !user.isEditing;
}

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

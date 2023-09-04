import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { DrawerService } from '../drawer.service';
import { LoadingService } from '../loading/loading.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


enum Gender {
  Male = "male",
  Female = "female",
}

enum Status {
  Inactive = "inactive",
  Active = "active",
}

type User = {
  id?: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status; 
  isEditing?: boolean;
};



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {

  users: any[] = []; 
  newUser: User = {
    name: '',
    email: '',
    gender: Gender.Male, 
    status: Status.Active, 
  };

  
  
  

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


postUser(user: User) {
  this.usersService.postUser(user).pipe(
    catchError((error) => {
     
      console.error('Ocorreu um erro ao criar o usuário:', error);
    

      return throwError(() => error);
    })
  ).subscribe(() => {
  
    this.users = [user,...this.users];
  });
}
putUser(userId: number, user: User) {
  this.usersService.putUser(userId, user).pipe(
    catchError((error) => {
      console.error('Ocorreu um erro ao atualizar o usuário:', error);
      return throwError(() => error);
    })
  ).subscribe((data: any) => {
    const updatedUsers = this.users.map((u) => (u.id === userId ? data : u));
    this.users = updatedUsers;
  });
}

executeEditAndPut(user: any) {
  this.toggleEditMode(user);
  this.putUser(user.id, user);
}


deleteUser(userId: number) {
  this.usersService.deleteUser(userId).pipe(
    catchError((error) => {
      console.error('Ocorreu um erro ao excluir o usuário:', error);
      return throwError(() => error);
    })
  ).subscribe(() => {
    this.users = this.users.filter((user) => user.id !== userId);
  });
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



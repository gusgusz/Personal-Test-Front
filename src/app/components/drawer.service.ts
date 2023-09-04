import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerOpenSubject = new BehaviorSubject<boolean>(false);
  drawerOpen$ = this.drawerOpenSubject.asObservable();

  private pageSubject = new BehaviorSubject<number>(1);
  page$ = this.pageSubject.asObservable();

  private perPageSubject = new BehaviorSubject<number>(5);
  perPage$ = this.perPageSubject.asObservable();

  private totalPagesSubject = new BehaviorSubject<number>(50);
  totalPages$ = this.totalPagesSubject.asObservable();

  toggleDrawer() {
    this.drawerOpenSubject.next(!this.drawerOpenSubject.value);
  }

  setPage(page: number) {
    this.pageSubject.next(page);
  }

  setPerPage(perPage: number) {
    this.perPageSubject.next(perPage);
  }

  setTotalPages(totalPages: number) {
    this.totalPagesSubject.next(totalPages);
  }
}

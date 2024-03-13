import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/selectors/auth.selectors';
import { Dashboard } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(
    private modalService: CustomValidatorsService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  Dashboard: Dashboard[] = [
    {
      name: 'dashboard',
      link: '/dashboard'
    },
    {
      name: 'student',
      link: '/dashboard/students'
    },
    {
      name: 'lecturer',
      link: '/dashboard/lectures'
    }
  ];
  logout() {
    this.modalService
      .confirm(
        'Confirm logout',
        'Are you sure you want to logout from Assign IT Dashboard?',
        'logout',
        'cancel'
      )
      .then(() => this.confirmLogout());
  }

  confirmLogout() {
    this.store.dispatch(logout());
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

 

 
}

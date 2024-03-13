import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard.component';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { logout } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  Dashboard: Dashboard[] = [
    {
      name: 'Dashboard',
      link: '/student'
    },
    {
      name: 'Submission',
      link: '/student/submission'
    }
  ];
  constructor(private customService: CustomValidatorsService, private store:Store<AppState>){}
  logout() {
    this.customService
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
    this.customService.Navigate('/');
  }
}

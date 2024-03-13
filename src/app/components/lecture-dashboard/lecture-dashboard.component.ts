import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard.component';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/auth.selectors';
import { logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-lecture-dashboard',
  templateUrl: './lecture-dashboard.component.html',
  styleUrls: ['./lecture-dashboard.component.css']
})
export class LectureDashboardComponent {
  Dashboard: Dashboard[] = [
    {
      name: 'dashboard',
      link: '/lecturer'
    },
    {
      name: 'student',
      link: '/lecturer/students'
    },
    {
      name: 'submission',
      link: '/lecturer/submissions'
    },
    {
      name: 'draft',
      link: '/lecturer/drafts'
    }
  ];

  constructor(
    private modalService: CustomValidatorsService,
    private store: Store<AppState>
  ) {}
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
    this.modalService.Navigate('/');
  }
}

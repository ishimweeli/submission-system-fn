import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardData, loadDashboard, loadStudents } from 'src/app/store/actions/auth.actions';
import { AppState, selectDashboar } from 'src/app/store/selectors/auth.selectors';
import { StudentData } from 'src/app/types';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminComponent {
  page: number = 1;
  firstname: string | null = localStorage.getItem('firstName');
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  lectures$: Observable<StudentData[]> = this.store.select(
    (state) => state.lecturers.lecturer.data.lecturers
  );
  students$: Observable<StudentData[]> = this.store.select(
    (state) => state.students.students.data.lecturers
  );
  dashboard$: Observable<DashboardData> = this.store.select(selectDashboar);
  constructor(private store: Store<AppState>) {}
  activeUsers: StudentData[] = [];
  ngOnInit() {
    this.store.dispatch(loadDashboard());
    this.store.dispatch(loadStudents({ page: this.page }));
    this.students$.subscribe((data) => {
      if (data) {
        const activeUsers = data.filter((item) => item.invited === true).map((item) => item.id);
        const inActive = data.filter((d) => d.invited === false).map((item) => item.id);

        this.barChartData = [
          {
            data: inActive,
            label: 'New users',
            stack: 'a',
            backgroundColor: '#4339F2',
            barThickness: 15.538
          },
          {
            data: activeUsers,
            label: 'Active users',
            stack: 'a',
            backgroundColor: '#34B53A',
            barThickness: 15.538
          },
          {
            data: inActive,
            label: 'Inactive users',
            stack: 'a',
            backgroundColor: '#FFB200',
            barThickness: 15.538
          }
        ];

        this.chart.update();
      }
    });

    for (let index = 0; index < this.barChartData.length; index++) {
      this.barChartLabels.push(index + 1);
    }
  }
  barChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: { stacked: true, grid: { display: false } }
    },
    borderRadius: 8
  };

  barChartType = 'bar';
  barChartLegend = true;

  barChartData: {
    data: number[];
    label: string;
    stack: string;
    backgroundColor: string;
    barThickness: number;
  }[] = [];

  barChartLabels: number[] = [];
}

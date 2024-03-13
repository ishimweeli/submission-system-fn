import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { downloadProject, downloadSnapshot } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  constructor(
    private modal: NgbActiveModal,
    private store: Store<AppState>
  ) {}
  @Input() snapshotId: number;
  @Input() submissionId: number;

  loading$: Observable<boolean> = this.store.select((store) => store.downloadSubmission.loading);
  snapshotLoading$: Observable<boolean> = this.store.select(
    (state) => state.downloadFile.snapshotLoading
  );

  downloadSnapshot() {
    this.store.dispatch(
      downloadSnapshot({ submissionId: this.submissionId, snapshotId: this.snapshotId })
    );
    this.store
      .select((store) => store.downloadFile.data)
      .subscribe((data) => {
        if (data) {
          this.saveFile(data, `snapshot.zip`);
        }
      });
    this.snapshotLoading$.subscribe((loading) => {
      if (!loading) {
        this.modal.close(true);
      }
    });
  }

  downloadSubmission() {
    this.store.dispatch(downloadProject({ submissionId: this.submissionId }));
    this.store
      .select((store) => store.downloadSubmission.data)
      .subscribe((data) => {
        if (data) {
          this.saveFile(data, 'submission.zip');
        }
      });
    this.loading$.subscribe((loading) => {
      if (!loading) {
        this.modal.close(true);
      }
    });
  }

  private saveFile(data: Blob | null, filename: string) {
    if (data) {
      const blob = new Blob([data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

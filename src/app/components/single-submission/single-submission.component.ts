/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import {
  loadAssignmentSubmissions,
  loadSubmissionsWithExractedFiles
} from 'src/app/store/actions/auth.actions';
import { AppState, selectassignmentSubmission } from 'src/app/store/selectors/auth.selectors';
import { ApiResponse, Folder, LecturerSubmissionsData, submission } from 'src/app/types';

@Component({
  selector: 'app-single-submission',
  templateUrl: './single-submission.component.html',
  styleUrls: ['./single-submission.component.css']
})
export class SingleSubmissionComponent {
  selectedContent: string | Folder[] | undefined;
  content: string | null = null;
  snapshotForm: FormGroup;
  data$: Observable<LecturerSubmissionsData> = this.store.select(selectassignmentSubmission);
  submissions$: Observable<ApiResponse> = this.store.select((state) => state.submission.data);
  isLoading$: Observable<boolean> = this.store.select(
    (store) => store.assignmentSubmission.isLoading
  );
  extractingLoading$: Observable<boolean> = this.store.select((store) => store.submission.loading);
  assignmentId: string;
  assignment: submission[] = [];
  submissionId: number;
  snapshotIds: number[] = [];
  snapshotId: number = 0;
  initialId: number[] = [];
  contents: { data: string; fileName: string }[] = [];
  data: Folder[] = [
    {
      type: 'folder',
      path: 'models',
      content: [
        {
          type: 'folder',
          path: 'models',
          content: [
            {
              type: 'file',
              path: 'files',
              content: 'fileContens'
            }
          ]
        }
      ]
    }
  ];
  ngOnInit() {
    this.store.dispatch(loadAssignmentSubmissions());
    this.data$.subscribe((data) => {
      const assignment = data.data.find((item) => item.assignmentId === this.assignmentId);
      if (assignment) {
        this.assignment = [assignment];
        assignment.submissions.map((item) => {
          return item.snapshots.map((item) => {
            this.submissionId = item.submissionId;
            this.snapshotIds.push(item.id);
          });
        });
      }
    });
  }
  handleFileClick(data: Folder[]): { data: string; fileName: string }[] {
    const results: { data: string; fileName: string }[] = [];
    function handleFileClickRecursive(data: Folder) {
      if (data.type === 'file') {
        results.push({ data: data.content as string, fileName: data.path });
      } else if (Array.isArray(data.content)) {
        for (const item of data.content) {
          handleFileClickRecursive(item);
        }
      } else if (data.content && typeof data.content === 'object') {
        handleFileClickRecursive(data.content);
      }
    }

    for (const f of data) {
      handleFileClickRecursive(f);
    }

    return results;
  }

  loadStudentSubmissionsWithFile(id: number) {
    this.content = null;
    this.contents = [];
    this.store.dispatch(loadSubmissionsWithExractedFiles({ studentId: id }));
    this.submissions$.subscribe((data) => {
      if (data) {
        const snapshot = data.data.flatMap((item) => item.snapshots.map((snapshot) => snapshot.id));
        this.initialId = snapshot;
        this.snapshotForm = this.fb.group({
          snapshot: [this.initialId[0]]
        });
        const value = this.snapshotForm.controls['snapshot'].value;
        const extractedFiles = data.data
          .flatMap((item) => item.snapshots)
          .filter((snap) => snap.id === value)
          .flatMap((snap) => snap.extractedFiles)
          .map((snap) => snap.snapshots);
        for (const type of extractedFiles) {
          for (const item in type) {
            if (Object.prototype.hasOwnProperty.call(type, item)) {
              this.contents = this.handleFileClick([type[item]]);
            }
          }
        }
      }
    });
  }
  onChange() {
    this.content = null;
    const id = this.getSnapShotId();

    if (id) {
      this.submissions$.subscribe((data) => {
        const extractedFiles = data.data
          .flatMap((item) => item.snapshots)
          .filter((snap) => snap.id === id)
          .flatMap((snap) => snap.extractedFiles)
          .map((snap) => snap.snapshots);

        for (const type of extractedFiles) {
          for (const item in type) {
            if (Object.prototype.hasOwnProperty.call(type, item)) {
              this.contents = this.handleFileClick([type[item]]);
            }
          }
        }
      });
    }
  }

  download() {
    const id = this.getSnapShotId();
    if (id) {
      this.modelService.downloadSnapshot(this.submissionId, this.snapshotId);
    }
  }
  showContent(index: number) {
    if (index >= 0 && index < this.contents.length) {
      this.content = this.contents[index].data;
    }
  }
  getSnapShotId(): number | null {
    let id = this.snapshotForm.controls['snapshot'].value;
    id = parseInt(id, 10);
    const snapshotId = this.initialId.find((item) => item === id);
    if (!snapshotId) {
      return null;
    }
    return (this.snapshotId = snapshotId);
  }
  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private modelService: CustomValidatorsService
  ) {
    this.assignmentId = this.router.snapshot.params['assignmentId'];
    this.snapshotForm = this.fb.group({
      snapshot: [this.initialId[0]]
    });
    this.snapshotForm = this.fb.group({
      snapshot: [this.initialId[0]]
    });
  }
}

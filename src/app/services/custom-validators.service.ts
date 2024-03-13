import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from '../components/logout/logout.component';
import { CreateLectureComponent } from '../components/createLecture/createLecture.component';
import { CreatestudentComponent } from '../components/createstudent/createstudent.component';
import { UploadBulkComponent } from '../components/upload-bulk/upload.component';
import { Router } from '@angular/router';
import { CreateAssignmentComponent } from '../components/create-assignment/create-assignment.component';
import { DeleteComponent } from '../components/delete/delete.component';
import { UpdateAssignmentComponent } from '../components/update-assignment/update-assignment.component';
import { InviteStudentComponent } from '../components/invite-student/invite-student.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { DownloadComponent } from '../components/download/download.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {
  patternValidators(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (!control.value) {
        return null;
      }

      return regex.test(control.value) ? null : error;
    };
  }
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private clipboard: Clipboard,
    private toast: ToastrService
  ) {}

  public confirm(
    title: string,
    message: string,
    btnConfirmTxt: string = 'Ok',
    btnCancel: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'lg'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(LogoutComponent, { size: dialogSize, centered: true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnConfirmTxt = btnConfirmTxt;
    modalRef.componentInstance.btnCancel = btnCancel;

    return modalRef.result;
  }
  public createLecture(title: string, dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(CreateLectureComponent, {
      size: dialogSize,
      centered: true
    });
    modalRef.componentInstance.title = title;
    return modalRef.result;
  }
  public createStudent(title: string, dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(CreatestudentComponent, {
      size: dialogSize,
      centered: true
    });
    modalRef.componentInstance.title = title;
    return modalRef.result;
  }

  public upLoad() {
    const modalRef = this.modalService.open(UploadBulkComponent);
    return modalRef.result;
  }
  public Navigate(url: string) {
    this.router.navigate([url]);
  }

  public CreateAssignment() {
    const modalRef = this.modalService.open(CreateAssignmentComponent);
    return modalRef.result;
  }

  public DeleteAssignment(idToDelete: number) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.id = idToDelete;
    return modalRef.result;
  }
  public updateAssignment(id: string) {
    const modalRef = this.modalService.open(UpdateAssignmentComponent);
    modalRef.componentInstance.id = id;
    return modalRef.result;
  }
  public inviteStudent(assignmentId: string, id: string) {
    const modalRef = this.modalService.open(InviteStudentComponent);
    modalRef.componentInstance.assignmentId = assignmentId;
    modalRef.componentInstance.Id = id;
    return modalRef.result;
  }
  copyToClipBoard(text: string): void {
    this.clipboard.copy(text);
    this.toast.success('copied to clipboard');
  }
  public downloadSubmission(submissionId: number) {
    const modalRef = this.modalService.open(DownloadComponent);
    modalRef.componentInstance.submissionId = submissionId;
    return modalRef.result;
  }
  public downloadSnapshot(submissionId: number, snapshotId: number) {
    const modalRef = this.modalService.open(DownloadComponent);
    modalRef.componentInstance.submissionId = submissionId;
    modalRef.componentInstance.snapshotId = snapshotId;
    return modalRef.result;
  }
}

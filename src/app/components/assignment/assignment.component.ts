import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {
  @Input() title: string = '';
  @Input() description: string = ' ';
  @Input() DeadLine: Date = new Date();
  @Input() uniqueCode: string = '';
  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateAssignment: EventEmitter<number> = new EventEmitter<number>();
  @Output() inviteStudentId: EventEmitter<string> = new EventEmitter<string>();
  @Output() copToClipboard: EventEmitter<boolean> = new EventEmitter<boolean>();

  DeleteAssignment() {
    this.deleteId.emit();
  }
  UpdateAssignment() {
    this.updateAssignment.emit();
  }

  inviteStudent() {
    this.inviteStudentId.emit();
  }
  copyToclpboard() {
    this.copToClipboard.emit();
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Input} from '@angular/core'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() btnCancel: string = '';
  @Input() btnConfirmTxt: string = '';
  @Input() title: string = '';
  @Input() message: string = '';


  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.close(false);
  }

  public decline() {
    this.activeModal.dismiss();
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-noresourcefound',
  templateUrl: './noresourcefound.component.html',
  styleUrls: ['./noresourcefound.component.css']
})
export class NoresourcefoundComponent {
  @Input() message: string = '';
}

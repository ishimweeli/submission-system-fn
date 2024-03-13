import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Input() imgSrc:string = ''
@Input() length:number = 0
@Input() cardText:string =''
}

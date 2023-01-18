import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-wish',
  templateUrl: './button-wish.component.html',
  styleUrls: ['./button-wish.component.scss'],
})
export class ButtonWishComponent {
  @Input()
  isWish: boolean = false;
 
}

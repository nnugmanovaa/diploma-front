import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'mfo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('100ms ease-out')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})
export class AppComponent {
  media: boolean = false;
  img: string = "call-ico.svg";

  title = 'mfo-app';

  constructor() { }

  get stateName() {
    return this.media ? 'show' : 'hide'
  }

  toggle() {
    this.media = !this.media;
    this.img = this.media ? 'close-button.png' : 'call-ico.svg';
  }
}

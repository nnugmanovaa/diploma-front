import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'mfo-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-40%)' }))
      ])
    ])
  ]
})
export class DropdownComponent implements OnInit {
  dropdown: boolean = false;
  option: string = "Выберите";
  type: any = {
    'Аннуитетный': 'ANNUITY_PAYMENTS',
    'Дифференцированный': 'graded'
  }
  choice: string = "";


  @Input() list: any[] = [];
  @Input() class: string = "";
  @Output() selection: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setOption(item: string) {
    this.option = item;
    if (this.type[this.option] !== undefined) {
      // this.selection.emit(this.list[0]);
      this.selection.emit(this.type[this.option]);
    } else {
      this.selection.emit(this.option);
    }
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown
  }

}

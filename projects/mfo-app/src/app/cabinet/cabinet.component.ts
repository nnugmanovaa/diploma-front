import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfo-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  modal:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

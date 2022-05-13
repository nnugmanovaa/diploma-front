import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CabinetService } from '../../core/services/cabinet.service';

@Component({
  selector: 'mfo-cashed-out',
  templateUrl: './cashed-out.component.html',
  styleUrls: ['./cashed-out.component.scss']
})
export class CashedOutComponent implements OnInit {

  loan:any = null;

  constructor(private cabinet:CabinetService) { }

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule(){
    console.log('inside cabinet');
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  value1: String;
  value2: String;

  constructor() {
    this.value1='';
    this.value2='7380086948'
   }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  feedbacks: string[] = ['Great', 'Okay', 'Not Good']

  constructor() { }

  ngOnInit(): void {
  }

}

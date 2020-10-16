import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Form } from '../form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ FormService ]
})
export class FormComponent implements OnInit {
  feedbacks: string[] = ['Great', 'Okay', 'Not Good']
  feedbackForm= new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    feedback: new FormControl(''),
    comment: new FormControl(''),
  });
  getform: Form;   

  constructor(private _f: FormBuilder, private formservice: FormService) {

  }
  step;
  setStep(index: number) {this.step = index;}
  nextStep(){this.step++;}
  prevStep(){this.step--;}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.formservice.getForm().subscribe(form=>this.feedbackForm.setValue(form));
  }

  onSubmit(): void {
    this.formservice.postForm(this.feedbackForm.value).subscribe(form => {
      delete form['created'];
      console.log(JSON.stringify(form));
      this.feedbackForm.setValue(form);
    }
    );
  }
}
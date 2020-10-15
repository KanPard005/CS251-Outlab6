import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormService } from './form.service';
// import { CommonService } from '../common.service'
class Form{
  name: string;
  email:string;
  feedback: string;
  comments: string

}

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
    comments: new FormControl(''),
  });
  getform: Form;   

  constructor(private _f: FormBuilder, private formservice: FormService) {

  }
  step;
   form: Form;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit() {
    this.Getforms();
    this.feedbackForm.patchValue(this.getform);
    console.log(this.feedbackForm.valueChanges)
  }

  setform(): Form{
    return {name: 'danish', email: 'danishangurl28@gmail.com', feedback: 'Okay', comments: 'good work'};
  }

  Getforms(){
    console.log('in getforms');
    this.formservice.getfeed().subscribe(result=>{
      console.log('data: ', result);
      this.getform=result;
    }, error=>console.log('error: ', error));
  }


}
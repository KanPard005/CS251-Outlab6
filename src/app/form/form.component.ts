import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  setStep(index: number) {this.step = index;}
  nextStep(){this.step++;}
  prevStep(){this.step--;}

  ngOnInit() {
    this.Getforms();
    this.feedbackForm=new FormGroup({
      name: new FormControl(this.getform.name, [Validators.required]),
      email: new FormControl(this.getform.email, [Validators.required, Validators.email]),
      feedback: new FormControl(this.getform.feedback, [Validators.required]),
      comments: new FormControl(this.getform.comments)
    });
  }
  Getforms(){
    console.log('in getforms');
    this.formservice.getfeed().subscribe(result=>{
      console.log('data: ', result);
      this.getform=result;
    }, error=>console.log('error: ', error));
  }
  postform(){
    //post function
    window.location.reload();
    console.log(this.feedbackForm.value);
  }

}
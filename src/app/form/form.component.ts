import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';
// import { CommonService } from '../common.service'
class Form{
  name: string;
  email:string;
  feedback: string;
  comment: string

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
    this.Getforms();
    this.feedbackForm=new FormGroup({
      name: new FormControl(this.getform.name, [Validators.required]),
      email: new FormControl(this.getform.email, [Validators.required, Validators.email]),
      feedback: new FormControl(this.getform.feedback, [Validators.required]),
      comment: new FormControl(this.getform.comment)
    });
  }
  Getforms(){
    console.log('in getforms');
    this.formservice.getForm().subscribe(result=>{
      console.log('data: ', result);
      this.getform=result;
    }, error=>console.log('error: ', error));
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
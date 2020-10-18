import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';
// import { CommonService } from '../common.service'
import { Form } from '../form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ FormService ]
})
export class FormComponent implements OnInit {
  feedbacks: string[] = ['Great', 'Okay', 'Not good']
  feedbackForm= this.fbd.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    feedback: [''],
    comment: [''],
  });
  getform: Form = {
    name:'',
    email: '',
    feedback: '',
    comment: '',
  };
  constructor(private fbd: FormBuilder, private formservice: FormService) {
  }
  step;
  setStep(index: number) {this.step = index;}
  nextStep(){this.step++;}
  prevStep(){this.step--;}
  ngOnInit() {
    this.Getforms();
  }
  Getforms(){
    console.log('in getforms');
    this.formservice.getForm().subscribe(result=>{
      console.log('data: ', result);
      this.getform=result;
      this.feedbackForm.get('feedback').setValue(result.feedback);
    }, error=>console.log('error: ', error));
  }
  onSubmit(): void {
    if(!this.feedbackForm.value['feedback']){
      this.feedbackForm.value['feedback']=this.getform.feedback;
    }
    if(this.feedbackForm.valid){
      this.formservice.postForm(this.feedbackForm.value).subscribe(form => {
        delete form['created'];
        console.log(JSON.stringify(form));
        this.getform=form;
      });
    }
    else{
      alert('please enter valid input fields')
    }
  }
}
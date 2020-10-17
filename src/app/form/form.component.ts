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
  feedbackForm= this.fbd.group({
    // name: new FormControl(''),
    // email: new FormControl(''),
    // feedback: new FormControl(''),
    // comment: new FormControl(''),
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    feedback: ['', Validators.required],
    comment: [''],
  });
  getform: Form;
  constructor(private fbd: FormBuilder, private formservice: FormService) {
    this.getform= new Form();
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
    if(this.feedbackForm.valid){
      this.formservice.postForm(this.feedbackForm.value).subscribe(form => {
        delete form['created'];
        
        console.log(JSON.stringify(form));
        // this.feedbackForm.setValue(form);
        this.getform=form;
      });
    }
    else{
      alert('please enter valid input fields')
    }
  }
}
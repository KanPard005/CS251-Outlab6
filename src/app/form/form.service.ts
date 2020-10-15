import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
class Form{
    name: string;
    email: string;
    feedback: string;
    comments: string;
}
@Injectable({providedIn: 'root'})
export class FormService {

	constructor(private http: HttpClient){

	}
	
	addfeed(form: Form){
		return this.http.post('outlab-6.herokuapp.com/add_new_feedback/',{
            name: form.name,
            email: form.email,
            feedback: form.feedback,
            comments: form.comments
		})
    }
    getfeed():Observable<Form>{
        console.log('in service');
        return this.http.get<Form>('https://cs251-outlab-6.herokuapp.com/initial_values/');

    }
}

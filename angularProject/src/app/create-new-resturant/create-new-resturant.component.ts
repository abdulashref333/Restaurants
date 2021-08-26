import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ResturantService } from '../services/resturant.service';
@Component({
  selector: 'app-create-new-resturant',
  templateUrl: './create-new-resturant.component.html',
  styleUrls: ['./create-new-resturant.component.css']
})
export class CreateNewResturantComponent implements OnInit {
  resturantForm!:FormGroup;
  userId:string = '';
  constructor(
    private authService: AuthService,
    private fb:FormBuilder,
    private resturantService:ResturantService,

  ) { }

  ngOnInit(): void {
    // console.log()
    this.userId = JSON.parse(String(localStorage.getItem('authTokenKey'))).userId;
    this.initResturantForm();
  }
  submit() {
    const controls = this.resturantForm.controls;
    // this.loginForm.controls["name"].disable();
		/** check form */
		if (this.resturantForm.invalid) {
      Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
        );
        return;
    }
    const resturantData:any = {
      name: controls.name.value,
      describtion: controls.describtion.value,
      address: [{city: controls.address.get('city')?.value, street: controls.address.get('city')?.value}],
    };

    if(this.userId){
      resturantData.userId = this.userId;
    }
    console.log(resturantData);
    this.resturantService.createResturant(resturantData).subscribe(res => console.log(res));
  }
  initResturantForm() {
		this.resturantForm = this.fb.group({
      name:['', Validators.required],
			describtion: [''],
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['']
      }),
		});
	}


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  resturant:any = {};

  constructor(
    private authService: AuthService,
    private fb:FormBuilder,
    private resturantService:ResturantService,
    private activatedRouter: ActivatedRoute,
    private route:Router,
  ) { }

  ngOnInit(): void {
    // console.log()
    this.activatedRouter.params.subscribe(params => {
      const resturantId = params.id;
      if(resturantId){
        this.initResturantForm();
        this.fetchData(resturantId);
      }else{
        this.initResturantForm();
      }
    })
    this.userId = JSON.parse(String(localStorage.getItem('authTokenKey'))).userId;
  }

  initResturantForm() {
		this.resturantForm = this.fb.group({
      name:['', Validators.required],
			description: [''],
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['']
      }),
		});
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
      description: controls.description.value,
      address: [{city: controls.address.get('city')?.value, street: controls.address.get('street')?.value}],
    };

    if(this.userId){
      resturantData.userId = this.userId;
    }
    if(this.resturant._id) resturantData._id = this.resturant._id;

    console.log(resturantData);
    this.resturantService.addResturant(resturantData).subscribe(res => {
      this.route.navigateByUrl('/resturants')
    });
  }

  fetchData(resturantId:string): void{
    this.resturantService.getResturantById(resturantId).subscribe(res => {

      res = res[0];
      this.resturant = res;
      this.resturantForm.patchValue({
        name: res.name,
        description: res.description ? res.description : '',
      })
      this.resturantForm.get('address')?.patchValue({
        city: res.address[0].city,
        street: res.address[0].street
      })
    })
  }

}

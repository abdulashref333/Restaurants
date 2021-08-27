import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
  signupForm!: FormGroup;
  signup:boolean = false;
  returnUrl:string = '';

  constructor(
    private authService:AuthService,
		private fb: FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
		this.initLoginForm();
  }

  initLoginForm() {
		this.loginForm = this.fb.group({
      name:['', Validators.required],
			email: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

  submit() {
    const controls = this.loginForm.controls;
    this.loginForm.controls["name"].disable();
		/** check form */
		if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
        );
        return;
      }

      console.log('i am her..')
      if(this.signup){
        const user = {
          name: controls.name.value,
          email: controls.email.value,
          password: controls.password.value
        }
        return this.authService.signUp(user);
      }else{
      }

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};
		this.authService
			.login(authData.email, authData.password)
			.pipe(
				tap(user => {
					if (user) {
            this.router.navigate([`${this.returnUrl}`])
              .then(() => {
                window.location.reload();
              });
          }
				})
			)
			.subscribe();
	}
  showSignup(){
    this.signup = true;
  }
}

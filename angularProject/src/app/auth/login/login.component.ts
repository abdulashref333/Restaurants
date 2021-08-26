import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
  signupForm!: FormGroup;
  signup:boolean = false;

  constructor(
    private authService:AuthService,
		private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
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
      if(this.signup && false){
        const user = {
          name: controls.name.value,
          email: controls.email.value,
          password: controls.password.value
        }
        return this.authService.signUp(user);
      }else{
      }
		// this.loading = true;

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};
		this.authService
			.login(authData.email, authData.password)
      console.log('i am after login')
		// 	.pipe(
		// 		tap(user => {
		// 			if (user) {
		// 				this.store.dispatch(new Login(user));

		// 				this.router.navigateByUrl(this.returnUrl); // Main page

		// 			} else {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 			}
		// 		}),
		// 		takeUntil(this.unsubscribe),
		// 		finalize(() => {
		// 			this.loading = false;
		// 			this.cdr.markForCheck();
		// 		}),
		// 		catchError(err => {
		// 			this.loading = false;
		// 			this.cdr.markForCheck();
		// 			console.log('error ==> ', err)
		// 			if (err.error && err.error.error && err.error.error.statusCode && err.error.error.statusCode == 401) {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 			} else if (err.error && err.error.error && err.error.error.statusCode && err.error.error.statusCode == 403) {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.USER_BLOCKED'), 'danger');
		// 			} else {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.BACKEND_ERROR'), 'danger');
		// 			}
		// 			return of(null);
		// 		})
		// 	)
		// 	.subscribe();
	}
  showSignup(){
    this.signup = true;
  }
}

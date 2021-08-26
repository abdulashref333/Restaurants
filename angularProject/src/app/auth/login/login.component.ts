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

  constructor(
    private authService:AuthService,
		private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
		this.initLoginForm();

  }

  initLoginForm() {
		this.loginForm = this.fb.group({
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
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		// this.loading = true;

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};
		this.authService
			.login(authData.email, authData.password)
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

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    const val = this.form.value;
    if (val.email && val.password) {
      //Send register message to server
      this.authService.register(val.email, val.password)
        .subscribe(data=>{
          console.log("User is registered");
          this.router.navigateByUrl('/');
        });
    }
  }

}
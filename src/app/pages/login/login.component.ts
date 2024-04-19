import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/models/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username = '';
  public password = '';
  public errorMessage = '';
  public loginForm: FormGroup;


  public constructor(private authenticationService: AuthenticationService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    const {username, password} = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authenticationService.login({ username: username, password: password })
        .subscribe({
          next: (success) => {
            if (success){
              this.route.navigate(['/products']);
            } else {
              this.errorMessage = 'Invalid username or password.';
            }
          },
          error: (error) => {
            this.errorMessage = error;
          }
        });
    } else {
      this.errorMessage = 'Please provide both username and password.';
    }

  }
}

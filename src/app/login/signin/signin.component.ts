import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicies/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  submited = false;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      userName:['', [Validators.required, Validators.minLength(10)]],
      password:['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onLoginSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.submited = true;
      this.authService.signIn(this.loginForm.value).subscribe((data:any) => {
        if(data){
          this.router.navigate(['/products']);
        }
      });
    }
  }

}

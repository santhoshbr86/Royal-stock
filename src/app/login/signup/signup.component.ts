import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servicies/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!:FormGroup;
  roles:string[] = ['admin', 'user'];
  returnUrl!:string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createSignUpForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'products';
  }
  createSignUpForm(){
    this.signUpForm = this.fb.group({
      name:['', [Validators.required, Validators.maxLength(100)]],
      password:['', [Validators.required, Validators.minLength(10)]],
      email:['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      phone:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      role:['', [Validators.required]]
    })
  }
  onSave(){
    if(this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value).subscribe(
        (data:any) => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
      });
    }
  }
}

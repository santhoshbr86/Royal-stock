import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      phone:['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      description:[''],
      contact: this.fb.array([this.createContactForm(), Validators.required])
    }); 
  }
  createContactForm(){
    return this.fb.group({
      name:['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }
  submitTheform(){
    console.log(this.contactForm.value);
  }
  addContact(){
    const controls =  <FormArray>this.contactForm.controls['contact'];
    controls.push(this.createContactForm());
  }
  get contForm(){
    return this.contactForm.get('contact') as FormArray
  }
}

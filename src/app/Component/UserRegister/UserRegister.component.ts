import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { existEmailValidator } from 'src/app/CustomValidator/ExistEmail.validator';
import { passwordMatch } from 'src/app/CustomValidator/PasswordMatch.validator';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-UserRegister',
  templateUrl: './UserRegister.component.html',
  styleUrls: ['./UserRegister.component.css']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  existUserEmails: string[] = [];
  emailFocused: boolean = false;


  constructor(private fb: FormBuilder) {
    // this.existUserEmails = ['ss@aa', 'ss@bb', 'ss@cc', 'ss@dd', "saidsalah375@gmail.com"];
    this.userRegisterForm = fb.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Z a-z]{4,}')]],
      email: ['', [Validators.required, existEmailValidator()]],
      phoneNo: fb.array([new FormControl('')]),
      address: fb.group({
        city: [''],
        postalCode: [''],
        street: ['']
      }),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      referral: [''],
      referralOther: [''],
    }, { validators: [passwordMatch()] });
  }

  ngOnInit() { }

  get fullName() {
    return this.userRegisterForm.get('fullName');
  }

  get email() {
    return this.userRegisterForm.get('email');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }

  get phoneNumber() {
    return this.userRegisterForm.get('phoneNo') as FormArray;
  }

  get referral() {
    return this.userRegisterForm.get('referral');
  }

  onEmailFocus() {
    this.emailFocused = true;
  }
  
  onEmailBlur() {
    this.emailFocused = false;
  }
  fillForm() {
    this.userRegisterForm.patchValue({
      fullName: 'said',
      email: 'saidsald@gmail.com',
      phoneNo: ['01066536088'],
      address: {
        city: 'Giza',
        postalCode: 111,
        street: 'street'
      },
      password: '01066536008',
      confirmPassword: '010225633548',
    });
  }

  addPhoneNo(event: any) {
    this.phoneNumber.push(this.fb.control(''));
    event.target?.classList.add('d-none');
  }

  removePhoneNo(index: number) {
    this.phoneNumber.removeAt(index);
  }

  submit() {
    let userModel = this.userRegisterForm.value as User;
    console.log(userModel);
  }

  updateReferralValidators() {
    if (this.referral?.value == 'other') {
      this.userRegisterForm.get('referralOther')?.setValidators([Validators.required]);
    } else {
      this.userRegisterForm.get('referralOther')?.clearValidators();
    }
    this.userRegisterForm.get('referralOther')?.updateValueAndValidity();
  }
}

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public oldPassword: string;
  public user: User;
  public loading = true;
  public form = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
    ProfileComponent.passwordMatchValidator,
  );

  public static passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : { 'mismatch': true };
  }

  public constructor(protected _http: HttpClient,
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this.user = this.getUser();
  }

  ngOnInit() {
    this.loading = false;
  }

  public getUser(): User {
    return JSON.parse(JSON.stringify(this._authService.user));
  }

  public validatePassword() {
    let user = new User;
    user.email = this.user.email;
    user.password = this.oldPassword;
    this._userService.checkPassword(user).subscribe(
      response => {
        this.updatePassword();
      },
      (error: any) => {
        window.alert('Wrong password');
      },
      () => {
        //
      }
    );
  }

  public updatePassword() {
    this._userService.update(this.user).subscribe(
      updatedPassword => {
        this.oldPassword = this.user.password
        this.form.reset();
        window.alert('Your password has been successfully changed');
      },
      (error: any) => {
        window.alert('Fail');
      },
      () => {
        //
      }
    );
  }



}

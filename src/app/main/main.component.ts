import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  form!: FormGroup;
  formSubscription!:Subscription

  buildForm(): void {
    this.form = this._formBuilder.group({
      size:[''],
      unit:['']
    });

    this.formSubscription = this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(() => {
      console.log(this.form.value);
    });
  }


  reset(): void {
    this.form.reset();
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

}

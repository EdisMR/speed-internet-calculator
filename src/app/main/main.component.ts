import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  form!: FormGroup;
  formSubscription!: Subscription;

  units = [
    { value: 'b', viewValue: 'bytes' },
    { value: 'kb', viewValue: 'kilobytes' },
    { value: 'mb', viewValue: 'megabytes' },
    { value: 'gb', viewValue: 'gigabytes' },
    { value: 'tb', viewValue: 'terabytes' },
  ];

  speeds = [
    { text: '14bps', value: 0.014 },
    { text: '28bps', value: 0.028 },
    { text: '33bps', value: 0.033 },
    { text: '56kps', value: 56 },
    { text: '64kbps', value: 64 },
    { text: '128kbps', value: 128 },
    { text: '256kbps', value: 256 },
    { text: '512kbps', value: 512 },
    { text: '900kbps', value: 900 },
    { text: '1Mbps', value: 1000 },
    { text: '1.7Mbps', value: 1700 },
    { text: '2Mbps', value: 2000 },
    { text: '4Mbps', value: 4000 },
    { text: '10Mbps', value: 10000 },
    { text: '40Mbps', value: 40000 },
    { text: '100Mbps', value: 100_000 },
    { text: '200Mbps', value: 200_000 },
    { text: '300Mbps', value: 300_000 },
    { text: '500Mbps', value: 500_000 },
  ];


  inputToKiloBytes() {
    const size = Number(this.form.value.size);
    const unit = this.form.value.unit;

    if (unit === 'b') {
      return size / 1024;
    }

    if (unit === 'kb') {
      return size;
    }

    if (unit === 'mb') {
      return size * 1024;
    }

    if (unit === 'gb') {
      return size * 1024 * 1024;
    }

    if (unit === 'tb') {
      return size * 1024 * 1024 * 1024;
    }

    return 0;
  }

  calculateSpeed(){
    return 0
  }

  buildForm(): void {
    this.form = this._formBuilder.group({
      size: ['1'],
      unit: ['b'],
    });

    this.formSubscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
      });
  }

  reset(): void {
    this.form.reset();
  }

  constructor(private _formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}
}

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
    { text: '500Mbps', value: 500_000_000 },
    { text: '300Mbps', value: 300_000_000 },
    { text: '100Mbps', value: 100_000_000 },
    { text: '40Mbps', value: 40_000_000 },
    { text: '10Mbps', value: 10_000_000 },
    { text: '4Mbps', value: 4_000_000 },
    { text: '2Mbps', value: 2_000_000 },
    { text: '1.7Mbps', value: 1_700_000 },
    { text: '1Mbps', value: 1_000_000 },
    { text: '512kbps', value: 512000 },
    { text: '256kbps', value: 256000 },
    { text: '128kbps', value: 128000 },
    { text: '64kbps', value: 64000 },
    { text: '33bps', value: 33 },
    { text: '14bps', value: 14 },
  ];


  convertToBytes(value:number,unit:string):number {
    let result = 0
    switch(unit){
      case 'b': result = value; break;
      case 'kb': result = value * 1_024; break;
      case 'mb': result = value * 1_048_576; break;
      case 'gb': result = value * 1_073_741_824; break;
      case 'tb': result = value * 1_099_511_627_776; break;
      default: result = 0
    }
    return result
  }

  toDays(bps:number){
    let result = this.calculateSeconds(bps)/86400
    return Math.round(result)
  }

  toHours(bps:number){
    let result = (this.calculateSeconds(bps)/3600)%24
    return Math.round(result)
  }

  toMinutes(bps:number){
    let result = (this.calculateSeconds(bps)/60)%60
    return Math.round(result)
  }

  toSeconds(bps:number){
    let result = this.calculateSeconds(bps)%60
    return Math.round(result)
  }

  /* Calculate seconds fileSize/bps */
  calculateSeconds(bps:number):number{
    let fileSize:number = this.convertToBytes(this.form.value.size,this.form.value.unit)
    return fileSize/bps
  }



  /* FORM UTILITIES */
  buildForm(): void {
    this.form = this._formBuilder.group({
      size: [''],
      unit: ['mb'],
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
